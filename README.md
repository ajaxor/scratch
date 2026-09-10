# Hollowmere · The House of the Absent

A mobile browser puzzle adventure in an abandoned monastery. Thirteen authored rooms connect the monastery opening to the Drowned Works. Its machinery, records and relics form a nonlinear puzzle network.

## Play

[Open Hollowmere](https://ajaxor.github.io/scratch/)

The repository root redirects to `dist/`. GitHub Pages serves the repository root with no build step. For local development, serve the repository over HTTP; ES modules do not work through `file://`.

```sh
python -m http.server 8080
```

## The monastery and Drowned Works

- Seven rooms with distinct architectural footprints, shared courtyard views, aligned thresholds, and real furniture footprints: The Last Watch, The Rain Porch, The Widow’s Beds, The Gardener’s Rest, The Laundry Court, The Broken Quay, and The Borrowers’ Hall.
- Six new rooms form the Drowned Works, with independent equipment, shadow, and water puzzles that converge on the ferryman’s vigil. See [the implemented design](docs/DROWNED_WORKS.md) for designer spoilers.
- Three immediately open sanctuary exits and a freely traversable cloister loop.
- A gardener’s cabinet with a visible mechanical linkage, a shadow-operated compartment, a counterweighted tool cradle, shared water routing, and a ferry signal mechanism.
- A discoverable lantern, tile-based light and darkness, persistent oil lamps, ivy-covered windows, cuttable growth and parcels, hook crossings and cart pulls, and bell-revealed hollow stones. See [visible tool play](docs/VISIBLE_TOOL_PLAY.md).
- A placeable Lantern and a completed shadow puzzle in the Borrowers’ Hall; recoverable Tidehook and Echo Bell; a Tideglass vigil to restore in the original hall.
- Furnished rooms with ordinary inspectable objects, world-state feedback, and clues intended to matter in later chapters.
- A journal of inspected observations plus player notes, and a map of walked passages.
- Global undo, autosave, save export/import, and optional synthesized ambient sound.

There are no trial checklists, numbered puzzle routes, escalating hints, or solution buttons. The Tide vigil is completable. The other four regional beacons and the final hearth are not implemented yet. Passages outside this slice identify themselves when inspected, so unfinished content does not masquerade as a solvable puzzle.

The implemented architectural rationale is in [docs/CLOISTER_ARCHITECTURE.md](docs/CLOISTER_ARCHITECTURE.md).

The complete campaign blueprint remains in [docs/NONLINEAR_LEVEL_DESIGN.md](docs/NONLINEAR_LEVEL_DESIGN.md). This slice places the cabinet shutter control in C2, with its shaft and shutter visible in C3, to make the first relic puzzle span rooms. The laundry’s trellis gives the blade an immediate use and opens a second route into the Silt Archive. The foundry passage and deeper archive stair remain future connections.

## Controls

| Action | Touch / mouse | Keyboard |
| --- | --- | --- |
| Move | Tap floor or hold direction buttons | Arrows / WASD |
| Operate object / apply matching tool | Tap object or Interact | E / Enter |
| Inspect without operating | ◎ | R |
| Use selected relic | Relic action button | Space |
| Equip a recovered relic | Relic slot | 1–5 |
| Undo | Undo | Z |
| Map / journal | Header buttons | M / J |
| Pause | Menu | Escape |

Tap a distant object to approach and operate it. Select a tool to apply it directly to a matching object. Dark writing needs light; cut growth and lit lamps persist. Walk against wheeled objects to push them. Interact with a stand while carrying the Lantern to place it; interact with that stand again to retrieve it. A placed Lantern stays where it was left. Personal journal notes remain intact when undoing world actions.

## Saves

Existing opening and architectural saves migrate automatically into the expanded game. Version 1.3 adds persistent lighting and tool effects, preserving existing tools and puzzle progress. Newly added growth is cleared where it would overlap an existing player or moved cart. Only fresh journeys start without the lantern. The expansion preserves current positions and adds unstarted works mechanisms. The earlier architectural revision migrated old layouts by relocating positions: puzzle flags, tools, placed Lantern, discoveries, observations, and notes survive. Player and movable furniture positions reset to safe locations in the redesigned rooms. The original browser save is retained under `hollowmere.before-cloister`.

New saves use layout revision 2, version 2, campaign `absent-opening`, and localStorage key `hollowmere.journey.v2`. The previous `hollowmere.journey.v1` key is left untouched and can be downloaded with **Export previous campaign save** in the pause menu. Old campaign progress cannot be imported into the new room network.

Saves are local to this browser and origin. Export/import supports backups and device transfers. Imported saves are checked for valid rooms, physical positions, world flags, placed relics, and bounded text before replacement.

## Source and validation

- `dist/architecture.js`: authored floor plans, aligned thresholds, materials, and courtyard coordinates.
- `dist/content.js`: explicit rooms, props, inscriptions, and reciprocal connections.
- `dist/works-content.js` and `dist/works.js`: six additional rooms and the shared water, balance, shadow, signal and vigil systems.
- `dist/engine.js`: movement, interaction, shared world state, inventory, undo, and save validation.
- `dist/tool-content.js`, `dist/tool-play.js`, `dist/lighting.js`, `dist/tool-render.js`: physical tool interactions, light states and their presentation.
- `dist/renderer.js`: canvas room rendering with existing environment art and the new furnishing atlas.
- `dist/game.js`: touch/keyboard controls, journal, map, menus, and persistence.
- `tests/`: movement-level opening walkthrough and navigation checks.

```sh
npm test
npm run check
```

The checks cover three tool-acquisition orders in the works, shared hydraulics, signal failures, permanently latched gates, the Tide vigil, rendering every room, and three fresh-start branches, the remote cabinet condition, relic acquisition, the trellis and optional discovery, Lantern placement/recovery, save roundtrips and invalid-save rejection, every room entrance, every inspectable object's reachability, and cross-room undo. Browser/device visual QA and measured human puzzle difficulty have not been performed for this slice.

The game has no npm dependencies, accounts, server logic, or combat. Existing title and environment artwork are reused. See [ARTWORK.md](ARTWORK.md) for asset provenance. The old prototype under `archive/` is historical source; it is not loaded by the game.

## Cache-safe releases

The stable `dist/index.html` launcher requests `release.json` with a unique URL and `cache: no-store` on each launch. It loads the selected release document under an explicit base URL. Every game module, stylesheet, and local image resolves inside that release's content-derived directory. Caching those files is safe because their directory changes whenever game code or artwork changes. The title screen displays the version and build actually running and offers **Check for updates**. Network or incomplete-publication failures show a retry screen rather than silently starting stale code. Save storage remains unchanged.

Author the game document in `dist/game.html`, then run `npm run release` before publishing changes to `main`. Commit the generated release and manifest together, and retain previously published releases. `npm test` rejects a release manifest that no longer matches the authored game. A package version bump changes the readable version; the content-derived build changes automatically.

A browser that still holds the old pre-loader HTML needs one visit to a fresh launcher URL (for example `dist/?launch=1.1.0`) to receive the loader. After that, ordinary launches check for updates. Already-running games keep their current release until relaunched; publishing does not interrupt a puzzle. GitHub Pages must finish publishing before a new release can be discovered.
