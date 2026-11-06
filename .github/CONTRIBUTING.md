# Contributing

This is a small static site. Keep edits deliberate and preserve the reading experience.

- Prefer semantic HTML and descriptive alternative text.
- Support keyboard navigation, visible focus, and reduced-motion preferences.
- Avoid layout overflow at narrow viewport widths.
- Keep scripts readable; handle absent DOM elements without errors.
- Preserve photographic credits, permissions, and private material.
- Describe actual behavior only. Avoid unsupported speed or accessibility claims.

## Review
```sh
node --check script.js
python -m http.server 8000
```

Inspect the site on phone and desktop widths, test interactions with keyboard and pointer, and record results in the pull request. The repository does not currently define an automated browser test suite.
