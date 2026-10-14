# Deploy ForestMusicLanding to Timeweb (GitHub Actions)

Manual, repeatable production deploy for **forest-music.ru** on the existing
Timeweb Ubuntu/Apache host.

| Item | Value |
| --- | --- |
| Workflow | [`.github/workflows/deploy-timeweb.yml`](../.github/workflows/deploy-timeweb.yml) |
| Trigger | `workflow_dispatch` only (no push auto-deploy) |
| Server IP | `188.225.26.192` |
| SSL vhost file (validation) | `/etc/apache2/sites-available/forest-music.ru-ssl.conf` |
| Transfer | `rsync` **without** `--delete` |

This workflow does **not** change DNS, SSL certificates, CDN, Apache vhost
files, or other websites on the shared server.

> The older untracked Stage 2 migration script (`timeweb-forest-music-stage2*`)
> rewrites Apache and wipes DocumentRoot. It is **not** used here.

---

## Required GitHub Actions Secrets

Repository → Settings → Secrets and variables → Actions:

| Secret | Example / notes |
| --- | --- |
| `DEPLOY_SSH_HOST` | Must be `188.225.26.192` (workflow enforces this) |
| `DEPLOY_SSH_USER` | Deploy Linux user with SSH key auth (prefer non-root if possible) |
| `DEPLOY_SSH_PRIVATE_KEY` | Full private key PEM (including `BEGIN` / `END` lines). Never commit. |
| `DEPLOY_DEST_PATH` | Absolute DocumentRoot from the **active** SSL vhost, e.g. `/var/www/forest-music.ru/public` |

### How to set `DEPLOY_DEST_PATH` (one-time, on the server)

```bash
sudo awk 'tolower($1)=="documentroot"{print $2; exit}' \
  /etc/apache2/sites-available/forest-music.ru-ssl.conf
```

Copy that exact path into the `DEPLOY_DEST_PATH` secret. The workflow refuses
to deploy if the secret does not match Apache’s DocumentRoot.

---

## One-time SSH preparation (owner)

Do **not** create or install keys without owner approval. Outline only:

1. On your workstation, generate a dedicated deploy key (ed25519 recommended):

   ```bash
   ssh-keygen -t ed25519 -f forest-music-deploy -C "gha-forest-music-deploy" -N ""
   ```

2. Install **only the public** key on Timeweb for `DEPLOY_SSH_USER`
   (`~/.ssh/authorized_keys`). Restrict with `from=` / `command=` if desired.

3. Ensure the deploy user can:

   - Read `/etc/apache2/sites-available/forest-music.ru-ssl.conf`
   - Read/write the DocumentRoot directory
   - Create `/var/backups/forest-music.ru/` (or adjust `BACKUP_ROOT` later)

4. Put the **private** key contents into GitHub secret `DEPLOY_SSH_PRIVATE_KEY`.

5. Host keys for `188.225.26.192` are pinned in
   [`.github/deploy/known_hosts`](../.github/deploy/known_hosts).

---

## Deployment trigger

1. Open **Actions → Deploy to Timeweb → Run workflow**.
2. Set **confirm** to exactly `deploy`.
3. Run. Monitor logs (private key is never printed).

Local equivalent is intentionally not automated; production goes through GHA.

---

## What the workflow does

1. `npm ci` → `typecheck` → `lint` → `build`
2. Verifies privacy artifacts exist under `dist/privacy/`
3. Validates secrets + SSH key + host pin
4. On server: match `DEPLOY_DEST_PATH` to SSL vhost DocumentRoot; require existing `index.html`
5. Backup: `tar` of live DocumentRoot into `/var/backups/forest-music.ru/public-*.tgz` (**no live delete**)
6. `rsync -avz` of `dist/` → DocumentRoot (**no `--delete`**)
7. HTTPS checks (fail job if any mandatory URL ≠ 200):
   - `/`
   - `/privacy/`
   - `/privacy/hexonica/`
   - `/privacy/hexonica/ru.html`
   - `/privacy/privacy.css`
   - plus font + logo smoke checks

---

## Rollback (owner, on server)

Find the backup path in the workflow artifact `validate-backup-report.txt`
(`BACKUP_TGZ=...`).

Safe restore **without** `rm -rf` on the live tree:

```bash
BACKUP_TGZ=/var/backups/forest-music.ru/public-YYYYMMDDTHHMMSSZ.tgz
DEST="$(sudo awk 'tolower($1)=="documentroot"{print $2; exit}' \
  /etc/apache2/sites-available/forest-music.ru-ssl.conf)"

# Stage restore next to live, then swap directories (keeps a copy of the failed deploy).
TS=$(date -u +%Y%m%dT%H%M%SZ)
sudo mkdir -p "${DEST}.restore-${TS}"
sudo tar -C "${DEST}.restore-${TS}" -xzf "${BACKUP_TGZ}"
sudo mv "${DEST}" "${DEST}.failed-${TS}"
sudo mv "${DEST}.restore-${TS}" "${DEST}"
# Fix ownership if your Apache user requires it, e.g.:
# sudo chown -R www-data:www-data "${DEST}"
```

Verify:

```bash
curl -sI https://forest-music.ru/ | head -n 1
curl -sI https://forest-music.ru/privacy/ | head -n 1
```

---

## Out of scope / blockers until secrets exist

- Secrets not configured → workflow fails at “Require deploy secrets”
- Deploy user cannot read SSL vhost or write DocumentRoot / backup dir
- First production run not executed from this documentation step
