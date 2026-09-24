# GitHub Pages presentation

`pnpm build:pages` builds the public presentation into `.pages-dist`.
The homepage, team, contact and production pages reuse the existing InTissue
components, red styling, images and Hungarian/English translations. HTML is
prerendered in Hungarian; the language switch and contact form run in the browser.

The build uses `/InTissue/` as its base path. Professional catalog, animal,
video, registration and legal links lead to the existing site at
https://intissue-csontblokkok.konyaandras96.chatgpt.site, whose access controls
are unchanged. Its current owner-only audience may prevent other visitors
from opening those destinations. No authentication, fees, medical registrations,
database, or portal API is deployed to Pages.

Deploy the contents of `.pages-dist` to the `gh-pages` branch, and select that
branch (root directory) as the Pages source. An optional manual Actions workflow
is provided in `pages/github-pages.yml.example`; installing it under
`.github/workflows/` requires a GitHub token with workflow permissions.
Publication is pending explicit approval because Pages exposes
the presentation publicly. The source repository remains private; private
repository Pages support depends on the GitHub account plan.

Changing the existing Site or its database does not happen as part of this build.
