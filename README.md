# ForestMusic Landing

Официальный сайт личного бренда Android-разработчика **ForestMusic**
([forest-music.ru](https://forest-music.ru)).

Статический one-page сайт: портфолио приложений в RuStore и обращения
на разработку Android-приложений под заказ.

## Stack

- Vite
- React 19
- TypeScript
- CSS (без UI-framework)

Роутер не используется — только якорные секции.

## Local development

```bash
npm ci
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр `dist/` |
| `npm run lint` | Oxlint |
| `npm run typecheck` | TypeScript project references check |

## Production build

```bash
npm ci
npm run build
```

Результат: содержимое каталога `dist/`
(статические HTML/CSS/JS/assets).

## Deployment (Linux / Apache)

Production VirtualHost уже настроен на `forest-music.ru`.

DocumentRoot:

```text
/var/www/forest-music.ru/public
```

Важно: в DocumentRoot должны попасть **файлы из `dist/`**,
а не папка `dist` целиком.

### Пример rsync

```bash
npm ci
npm run build

rsync -avz --delete \
  ./dist/ \
  user@server:/var/www/forest-music.ru/public/
```

### Пример scp

```bash
npm ci
npm run build

scp -r ./dist/* user@server:/var/www/forest-music.ru/public/
```

После выкладки проверьте:

- https://forest-music.ru/
- якоря `#apps`, `#services`, `#process`, `#about`, `#contact`
- ссылки на RuStore и контактный email

SPA fallback (`.htaccess`) не требуется: сайт одностраничный без React Router.

## HTTPS deployment checklist

После выкладки статики на сервер:

1. Убедитесь, что DNS для `forest-music.ru` и `www.forest-music.ru`
   указывает на сервер.
2. Получите сертификат Let's Encrypt, например:

```bash
sudo certbot --apache -d forest-music.ru -d www.forest-music.ru
```

3. Проверьте редирект HTTP → HTTPS.
4. Проверьте, что `www` корректно редиректит на основной домен
   (или наоборот — по выбранной канонической схеме).
5. Canonical на сайте: `https://forest-music.ru/`

Серверные команды из этого репозитория автоматически не выполняются.

## Assets

Логотип:

```text
src/assets/logo.png
```

Иконки приложений:

```text
public/apps/<slug>/icon.webp
```

Скриншоты (по желанию):

```text
public/apps/<slug>/screenshot.webp
```

Каталог приложений задаётся в `src/data/apps.ts`.

## Yandex Metrika

Счётчик: `42579109` (подключается один раз в `index.html`).

Init: webvisor, trackHash, clickmap, ecommerce `dataLayer`,
accurateTrackBounce, trackLinks.

Helper: `src/lib/metrika.ts` → `trackGoal(name)`.

События:

- `email_click`
- `email_copy`
- `portfolio_rustore_click`
- `rustore_catalog_click`
- `web_project_click`
- `hero_contact_click`
- `header_contact_click`

## Contacts

First release: email only.

- Email assembled at runtime in `src/data/contacts.ts`
- Public mailbox: rustore-alex1c / yandex.ru
- Telegram / MAX reserved in the same config for later

Config: `src/data/contacts.ts`
