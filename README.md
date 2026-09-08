# Hollowmere · The House of the Absent

A mobile browser puzzle adventure in an abandoned monastery. The previous 47-room trial campaign has been replaced by the first seven rooms of the nonlinear redesign.

## Play

[Open Hollowmere](https://ajaxor.github.io/scratch/)

The repository root redirects to `dist/`. GitHub Pages serves the repository root with no build step. For local development, serve the repository over HTTP; ES modules do not work through `file://`.

```sh
python -m http.server 8080
```

## This opening chapter

- Seven rooms with distinct architectural footprints, shared courtyard views, aligned thresholds, and real furniture footprints: The Last Watch, The Rain Porch, The Widow’s Beds, The Gardener’s Rest, The Laundry Court, The Broken Quay, and The Borrowers’ Hall.
- Three immediately open sanctuary exits and a freely traversable cloister loop.
- One complete relic puzzle: the gardener’s cabinet, with controls and physical evidence across rooms.
- A usable Thornblade, a cuttable trellis, and a small optional discovery beyond it.
- A placeable Lantern and a side-light observation in the archive entrance.
- Furnished rooms with ordinary inspectable objects, world-state feedback, and clues intended to matter in later chapters.
- A journal of inspected observations plus player notes, and a map of walked passages.
- Global undo, autosave, save export/import, and optional synthesized ambient sound.

There are no trial checklists, numbered puzzle routes, escalating hints, or solution buttons. The five beacon mysteries and the final hearth are not implemented yet. Passages outside this slice identify themselves when inspected, so unfinished content does not masquerade as a solvable puzzle.

The implemented architectural rationale is in [docs/CLOISTER_ARCHITECTURE.md](docs/CLOISTER_ARCHITECTURE.md).

The complete campaign blueprint remains in [docs/NONLINEAR_LEVEL_DESIGN.md](docs/NONLINEAR_LEVEL_DESIGN.md). This slice places the cabinet shutter control in C2, with its shaft and shutter visible in C3, to make the first relic puzzle span rooms. The laundry’s trellis gives the blade an immediate use inside C4; the root stair and foundry passage remain future connections.

## Controls

| Action | Touch / mouse | Keyboard |
| --- | --- | --- |
| Move | Tap floor or hold direction buttons | Arrows / WASD |
| Operate nearby object | Interact | E / Enter |
| Inspect without operating | Tap nearby object or ◎ | R |
| Use selected relic | Relic action button | Space |
| Equip a recovered relic | Relic slot | 1 / 2 |
| Undo | Undo | Z |
| Map / journal | Header buttons | M / J |
| Pause | Menu | Escape |

Tap a distant object to approach it. Walk against wheeled objects to push them. Interact with a stand while carrying the Lantern to place it; interact with that stand again to retrieve it. A placed Lantern stays where it was left. Personal journal notes remain intact when undoing world actions.

## Saves

The architectural revision migrates existing opening saves automatically: puzzle flags, tools, placed Lantern, discoveries, observations, and notes survive. Player and movable furniture positions reset to safe locations in the redesigned rooms. The original browser save is retained under `hollowmere.before-cloister`.

New saves use layout revision 2, version 2, campaign `absent-opening`, and localStorage key `hollowmere.journey.v2`. The previous `hollowmere.journey.v1` key is left untouched and can be downloaded with **Export previous campaign save** in the pause menu. Old campaign progress cannot be imported into the new room network.

Saves are local to this browser and origin. Export/import supports backups and device transfers. Imported saves are checked for valid rooms, physical positions, world flags, placed relics, and bounded text before replacement.

## Source and validation

- `dist/architecture.js`: authored floor plans, aligned thresholds, materials, and courtyard coordinates.
- `dist/content.js`: explicit rooms, props, inscriptions, and reciprocal connections.
- `dist/engine.js`: movement, interaction, shared world state, inventory, undo, and save validation.
- `dist/renderer.js`: canvas room rendering with existing environment art and the new furnishing atlas.
- `dist/game.js`: touch/keyboard controls, journal, map, menus, and persistence.
- `tests/`: movement-level opening walkthrough and navigation checks.

```sh
npm test
npm run check
```

The checks cover three fresh-start branches, the remote cabinet condition, relic acquisition, the trellis and optional discovery, Lantern placement/recovery, save roundtrips and invalid-save rejection, every room entrance, every inspectable object's reachability, and cross-room undo. Browser/device visual QA and measured human puzzle difficulty have not been performed for this slice.

The game has no npm dependencies, accounts, server logic, or combat. Existing title and environment artwork are reused. See [ARTWORK.md](ARTWORK.md) for asset provenance. The old prototype under `archive/` is historical source; it is not loaded by the game.
