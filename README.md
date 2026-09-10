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

## GitHub

Репозиторий — **source of truth** для кода.

GitHub Pages **не используется** и не должен быть включён.
Production hosting — собственный Linux-сервер с Apache.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm ci
npm run build
```

Результат: готовый статический сайт в каталоге `dist/`.

## Production preview

```bash
npm run preview
```

Локальный просмотр содержимого `dist/` перед выкладкой на сервер.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр `dist/` |
| `npm run lint` | Oxlint |
| `npm run typecheck` | TypeScript project references check |

## Server DocumentRoot

Production VirtualHost уже настроен на `forest-music.ru`.

```text
/var/www/forest-music.ru/public
```

На сервер выкладывается **содержимое** `dist/`, не папка `dist` целиком:

```text
dist/*
→
/var/www/forest-music.ru/public/
```

После deployment должно получиться:

```text
/var/www/forest-music.ru/public/index.html
/var/www/forest-music.ru/public/assets/...
```

а не:

```text
/var/www/forest-music.ru/public/dist/index.html
```

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

Deployment на сервер выполняется отдельной командой и не запускается
из этого README автоматически.

SPA fallback (`.htaccess`) не требуется: сайт одностраничный без React Router.

## Assets

Логотип:

```text
public/logo.png
public/logo-header.png
```

Иконки приложений:

```text
public/apps/<slug>/icon.webp
```

Скриншоты featured-приложений:

```text
public/apps/<slug>/screen-1.webp
public/apps/<slug>/screen-2.webp
```

Каталог приложений: `src/data/apps.ts`.

## Yandex Metrika

Счётчик: `42579109` (подключается один раз в `index.html`).

Init: webvisor, trackHash, clickmap, ecommerce `dataLayer`,
accurateTrackBounce, trackLinks.

Helper: `src/lib/metrika.ts` → `trackGoal(name)`.

## Contacts

First release: email only.

- Email assembled at runtime in `src/data/contacts.ts`
- Public mailbox: rustore-alex1c / yandex.ru

Config: `src/data/contacts.ts`
