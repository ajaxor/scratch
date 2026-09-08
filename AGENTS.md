# Repository workflow

The owner wants changes integrated directly into `main`. Do not create pull requests unless explicitly requested. Preserve unrelated changes and never force-push over remote work.

# Browser game releases

Edit the authored files in `dist/`, including `dist/game.html` for the title/game document. `dist/index.html` is the stable launcher. Do not edit generated `dist/releases/` files manually.

After changing game files or assets, run `npm run release`, then `npm test` and `npm run check`. Commit the generated release directory and `dist/release.json` with the source changes. The builder gives every changed release a new content-derived directory, even if the package version was not bumped. Bump `package.json` version for a new named release. Keep previously published release directories available so already-open sessions retain their files.

The launcher checks a fresh manifest on every launch and loads a complete pinned release. Do not replace it with fixed script query strings or clear player storage to solve cache problems.
