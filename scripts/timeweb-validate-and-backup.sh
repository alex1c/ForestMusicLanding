#!/usr/bin/env bash
# Validate ForestMusic DocumentRoot against the active SSL vhost, then
# create a tarball backup of the live tree WITHOUT deleting DocumentRoot.
#
# Required env:
#   DEPLOY_DEST_PATH  Absolute DocumentRoot (must match Apache DocumentRoot)
# Optional env:
#   SSL_VHOST_CONF    Default: /etc/apache2/sites-available/forest-music.ru-ssl.conf
#   BACKUP_ROOT       Default: /var/backups/forest-music.ru
#   RELEASE_SHA       Recorded in backup sidecar metadata
set -euo pipefail

DOMAIN="forest-music.ru"
DEST="${DEPLOY_DEST_PATH:?DEPLOY_DEST_PATH is required}"
SSL_VHOST_CONF="${SSL_VHOST_CONF:-/etc/apache2/sites-available/forest-music.ru-ssl.conf}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/forest-music.ru}"
RELEASE_SHA="${RELEASE_SHA:-unknown}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "=== validate destination ==="
echo "dest=${DEST}"
echo "ssl_vhost_conf=${SSL_VHOST_CONF}"
echo "release_sha=${RELEASE_SHA}"

case "${DEST}" in
	/*) ;;
	*)
		echo "ERROR: DEPLOY_DEST_PATH must be an absolute path"
		exit 1
		;;
esac

if [[ "${DEST}" == "/" ]] || [[ "${DEST}" == "/var" ]] || [[ "${DEST}" == "/var/www" ]]; then
	echo "ERROR: refusing unsafe DocumentRoot candidate: ${DEST}"
	exit 1
fi

if [[ ! -f "${SSL_VHOST_CONF}" ]]; then
	echo "ERROR: SSL vhost conf not found: ${SSL_VHOST_CONF}"
	exit 1
fi

# First DocumentRoot directive in the SSL vhost (ignore comments).
APACHE_DOCROOT="$(
	awk '
		/^[[:space:]]*#/ { next }
		tolower($1) == "documentroot" {
			gsub(/\r/, "", $2)
			print $2
			exit
		}
	' "${SSL_VHOST_CONF}"
)"

if [[ -z "${APACHE_DOCROOT}" ]]; then
	echo "ERROR: DocumentRoot not found in ${SSL_VHOST_CONF}"
	exit 1
fi

echo "apache_document_root=${APACHE_DOCROOT}"

if [[ "${APACHE_DOCROOT}" != "${DEST}" ]]; then
	echo "ERROR: DEPLOY_DEST_PATH does not match Apache DocumentRoot"
	echo "  secret/path=${DEST}"
	echo "  apache=${APACHE_DOCROOT}"
	exit 1
fi

if [[ ! -d "${DEST}" ]]; then
	echo "ERROR: destination directory does not exist: ${DEST}"
	exit 1
fi

if [[ ! -f "${DEST}/index.html" ]]; then
	echo "ERROR: ${DEST}/index.html missing — refusing to deploy into an unexpected tree"
	exit 1
fi

# Refuse obvious peer-site paths (shared server safety).
case "${DEST}" in
	*first-calc*|*pipetka*|*docker*|/var/www/html)
		echo "ERROR: destination looks like a peer site path: ${DEST}"
		exit 1
		;;
esac

# Unprivileged deploy-forest must be able to create/replace files via rsync
# temp+rename. That requires write+execute on the DocumentRoot directory
# (group-writable is typical when files themselves are www-data 644).
# Do not chmod/chown the tree here — only detect and report.
echo "deploy_user=$(id -un) groups=$(id -Gn)"
if [[ ! -w "${DEST}" ]]; then
	echo "ERROR: DocumentRoot is not writable by $(id -un): ${DEST}"
	echo "HINT: directory needs group write (e.g. 2775 www-data) while keeping"
	echo "      file contents readable by Apache; do not run this script as root."
	exit 1
fi
WRITE_PROBE="${DEST}/.gha-write-probe-${STAMP}"
if ! printf 'ok\n' > "${WRITE_PROBE}"; then
	echo "ERROR: cannot create files in DocumentRoot as $(id -un)"
	exit 1
fi
rm -f "${WRITE_PROBE}"
echo "document_root_writable=OK"

echo "destination_validation=OK"

echo "=== backup live DocumentRoot (no delete) ==="
# Prefer /var/backups/... when writable; otherwise use deploy user home so we
# do not require changing system directory ownership for the first deploy.
if mkdir -p "${BACKUP_ROOT}" 2>/dev/null && [[ -w "${BACKUP_ROOT}" ]]; then
	echo "backup_root=${BACKUP_ROOT}"
else
	BACKUP_ROOT="${HOME}/backups/${DOMAIN}"
	mkdir -p "${BACKUP_ROOT}"
	echo "backup_root_fallback=${BACKUP_ROOT}"
fi
BACKUP_TGZ="${BACKUP_ROOT}/public-${STAMP}.tgz"
BACKUP_META="${BACKUP_ROOT}/public-${STAMP}.meta.txt"

tar -C "${DEST}" -czf "${BACKUP_TGZ}" .
{
	echo "stamp=${STAMP}"
	echo "domain=${DOMAIN}"
	echo "dest=${DEST}"
	echo "apache_document_root=${APACHE_DOCROOT}"
	echo "release_sha_before_deploy=${RELEASE_SHA}"
	echo "backup_tgz=${BACKUP_TGZ}"
	echo "hostname=$(hostname)"
	echo "deploy_user=$(id -un)"
} > "${BACKUP_META}"

ls -lh "${BACKUP_TGZ}"
echo "BACKUP_TGZ=${BACKUP_TGZ}"
echo "BACKUP_META=${BACKUP_META}"
echo "VALIDATE_AND_BACKUP_DONE"
