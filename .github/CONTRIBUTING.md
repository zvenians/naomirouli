# Contributing

This is a small static site. Keep edits deliberate and preserve the reading experience.

- Prefer semantic HTML and descriptive alternative text.
- Support keyboard navigation, visible focus, and reduced-motion preferences.
- Avoid layout overflow at narrow viewport widths.
- Keep scripts readable; handle absent DOM elements without errors.
- Preserve photographic credits, permissions, and private material.
- Describe actual behavior only. Avoid unsupported speed or accessibility claims.

## Review

Run the static checks and JavaScript syntax verification:

```sh
node --test tests/static-site.test.mjs
node --check script.js
```

The CI workflow also runs Chromium smoke tests at mobile and desktop viewport sizes. To reproduce those checks locally, install the same Playwright version and browser first:

```sh
npm install --no-save --no-package-lock playwright@1.62.1
npx playwright install chromium
node tests/browser-smoke.mjs
```

The browser suite checks page overflow, the note panel, keyboard focus and Escape behavior, and JavaScript errors. Review photographic permissions and actual devices separately; record any untested checks in the pull request.
