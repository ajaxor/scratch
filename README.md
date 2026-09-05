# Hollowmere · The Last Lantern

An atmospheric, mobile-first puzzle adventure rebuilt from the Relic Rooms prototype. Carry a lantern into an abandoned monastery, recover the keepers’ relics, and rekindle five beacons.

## Play

Serve this repository with any static HTTP server and open its root. The root redirects to `dist/`, which is also the standalone deployable game. GitHub Pages can continue to serve the repository root with no build step. ES modules require HTTP; opening the HTML with `file://` is not supported.

```sh
python -m http.server 8080
```

The game needs no npm dependencies, accounts, server, or database. It supports portrait and landscape touchscreens, mouse, and keyboard. The original prototype is preserved at `archive/relic-rooms.html`.

## The campaign

- 47 authored chambers: central sanctuary, five regions of nine rooms, and the final hearth.
- 30 mandatory trials spanning weights, ordered flames, thorns, hidden runes, hook crossings, pressure valves, reflected light, resonance, and frozen time.
- Six relics: Lantern, Thornblade, Tidehook, Dawn Prism, Echo Bell, and Stillglass.
- Five optional keeper memories and a fuller ending for finding all five.
- Connected room routes with reciprocal doors, progressive region unlocking, and sanctuary travel.
- Three escalating hints per room, explicit solutions, exact undo, and room reset.
- Device-local autosave, save export/import, journal, map, and optional synthesized ambient audio.

**Pacing target:** approximately 90–150 minutes for an unspoiled first playthrough including exploration and memories. This is a design estimate, not measured human playtime. A solver or experienced puzzle player will finish much faster. Difficulty and pacing need human playtesting, especially on physical phones.

## Controls

| Action | Touch / mouse | Keyboard |
|---|---|---|
| Move | Tap a tile, or hold direction buttons | WASD / arrows |
| Interact | Gold action button; tap adjacent object | E / Enter |
| Use relic | Button beneath Interact | Space |
| Select relic | Relic slots | 1–6 |
| Cast hook | Tap an aligned brass ring | Face ring, then Space |
| Undo | Undo button | Z |
| Inscription | ? in the room | R |
| Map / journal | Header buttons | M / J |
| Pause | Menu | Escape |

Movement is deliberately on a grid. There is no combat or reaction-speed requirement. Stillglass turns timed mechanisms into planning puzzles. You cannot permanently lose an item or memory by experimenting.

## Saves

The game stores versioned JSON under `hollowmere.journey.v1` in localStorage. A save belongs to this browser and origin. Use Export save and Import save in the pause menu to transfer progress to a different device or hosting address. Private browsing, storage restrictions, or clearing site data may remove local progress; export provides a portable backup.

## Source layout

- `dist/content.js`: authored regions, room descriptions, layouts, relics, and puzzle specifications.
- `dist/engine.js`: deterministic game rules and save model, independent of DOM and canvas.
- `dist/renderer.js`: layered canvas scene, sprite drawing, light, water, and particles.
- `dist/game.js`: input, pathfinding, overlays, persistence, accessibility, and mobile UI.
- `dist/audio.js`: optional browser-synthesized ambience and interaction sounds.
- `dist/style.css`: responsive portrait, landscape, and desktop interface.
- `dist/solutions.json`: executable weight-puzzle walkthroughs produced by the campaign solver.
- `tests/`: campaign completion and room-navigation regression checks.

## Validation

```sh
npm test
npm run check
```

The campaign test completes every trial with the actual movement and interaction engine, solves weight puzzles through a bounded search, checks all mirror and resonance solutions, collects all relics and memories, rekindles every beacon, reaches the ending, and checks save roundtrips and undo. The navigation test checks every doorway, return route, reciprocal spawn, and progression gate. Canvas scenes were rendered and inspected separately. Physical iOS/Android browser playtesting and measured campaign timing remain to be done.

## Artwork and sound

Original title art and sprite atlases generated for this game with the built-in image-generation tool, then encoded for web delivery. See `ARTWORK.md` for the asset briefs. Audio is synthesized locally using Web Audio; no audio file is fetched. The old `Breach Line.mp3` remains in the repository but is not used by Hollowmere.

Fonts use Cormorant Garamond and DM Sans when Google Fonts is reachable, with built-in serif and system sans-serif fallbacks. Gameplay makes no external API requests.
