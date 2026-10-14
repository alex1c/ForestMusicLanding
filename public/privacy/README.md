# Privacy Policy Center

Public static pages for ForestMusic Android app privacy policies.

These files live under `public/privacy/` so Vite copies them into `dist/privacy/`
unchanged. Apache can serve nested URLs directly (no React Router).

## Live URL structure

| URL | Purpose |
| --- | --- |
| `/privacy/` | Directory of audited app policies |
| `/privacy/hexonica/` | Hexonica privacy policy (English) |
| `/privacy/hexonica/ru.html` | Hexonica privacy policy (Russian) |

Do **not** add placeholder policies for apps whose data collection has not been audited.

## Adding another app (pattern)

1. Audit the app’s actual saves, SDKs, consent and Data Safety answers.
2. Create `public/privacy/<slug>/`:
   - `index.html` — English (or primary) policy
   - `ru.html` — Russian (recommended)
3. Reuse `/privacy/privacy.css` and the same header/footer chrome.
4. Set SEO tags: `<title>`, `meta description`, `link rel="canonical"`,
   `hreflang` alternates, Open Graph.
5. Add a card to `public/privacy/index.html` linking to `/privacy/<slug>/`.
6. Build and verify files exist under `dist/privacy/<slug>/`.
7. Deploy the landing site as usual (owner step — not automatic).

Suggested slug examples: `hexonica`, `nonogram`, `watersort` — kebab-case,
stable, no package name in the path.

## Source of Hexonica text

Technical claims were taken from the audited Hexonica drafts in
`alex1c/conectCellsRustore` (`docs/privacy/`), restyled for this site.
Do not invent new collection claims without evidence.
