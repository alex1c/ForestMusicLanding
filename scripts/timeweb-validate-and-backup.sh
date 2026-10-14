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

echo "destination_validation=OK"

echo "=== backup live DocumentRoot (no delete) ==="
mkdir -p "${BACKUP_ROOT}"
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
} > "${BACKUP_META}"

ls -lh "${BACKUP_TGZ}"
echo "BACKUP_TGZ=${BACKUP_TGZ}"
echo "BACKUP_META=${BACKUP_META}"
echo "VALIDATE_AND_BACKUP_DONE"
