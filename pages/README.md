# GitHub Pages website

`pnpm build:pages` builds the static website into `.pages-dist` using `/InTissue/` as its base path.

The homepage, team, contact, partners, catalog, veterinary information, videos and human product profiles remain on GitHub Pages. Shared components retain the red design and Hungarian/English language switch. Hungarian HTML is prerendered; catalog dialogs, video playback and the contact form run in the browser.

Registration and admin routes show a local availability notice and contact link. No portal API, authenticated sessions, registrations, protected fees or request submission is included. No navigation points to ChatGPT Sites. Video media and explicitly labeled original-source links can use intissue.com.

The Pages-specific privacy page describes this static version. The original server site's authentication and database behavior remain unchanged.

Deploy the contents of `.pages-dist` to the `gh-pages` branch (root directory), which is configured as the GitHub Pages source. Keep `.nojekyll`. The optional workflow example requires workflow permissions to install under `.github/workflows/`.
