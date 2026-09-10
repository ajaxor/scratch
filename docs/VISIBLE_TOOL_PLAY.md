# Visible tool play — 1.3.0

The monastery remains a thirteen-room, nonlinear puzzle network. This revision changes how the player discovers and manipulates it, rather than adding a sequence of mandatory trials.

## Light is world state

A new journey starts empty-handed. The abandoned lantern is in the Rain Porch, visible by its own flame. Recovering it creates a moving light source, regardless of the currently selected tool. Placing it on a stand removes that moving source and leaves the light at the stand.

Every tile is explicitly lit or dark. Open sky, the workshop shutters, cleared ivy windows, the lantern, lamps and the vigil provide light. Stone walls and voids block local light sources. Dark spaces retain silhouettes for navigation, but written observations cannot be read or entered in the journal there. Five faded marks only render and accept taps when illuminated.

Nineteen oil lamps let the player progressively reclaim interiors. They do not consume fuel and remain lit during travel, reloads and other tool use. Their placement supports the reading apse, archive aisles, workshop, laundry and well walkways. Three ivy-covered windows become permanent daylight sources when cut.

## Tools visibly change places

- **Thornblade:** cuts nineteen patches of growth, opens three ivy-covered windows, parts three parcel cords, cuts the original trellis and clears the intake roots. One patch obstructs the Rain Porch cart's wheels. Optional cuts clear paving and reveal small possessions without ticking a quest counter.
- **Tidehook:** catches visible mooring rings across the Broken Quay's flooded break. The lower landing contains a tied parcel and a return ring. The Bell Well also has a pair of coping rings: lighting the far side permits a long crossing. Cart rings support both a distant pull and the original adjacent step-back pull. The hook also hauls the sailcloth from the intake rack.
- **Echo Bell:** sends a visible expanding pulse through the room. Nearby hollow stones open into small pockets; four optional pockets remain open after travel and reload. The original water-fed mouths still operate the signal gate. Bell notes, raised pawls and their reset are visible/audible feedback.
- **Lantern:** moving illumination, persistent lamp lighting, visible faded marks, readable inscriptions, and deliberate placement for the archive shadow puzzle.

Use range and line of sight are checked in the engine. A crossing ends on a walkable, unoccupied tile. Every crossing has a usable return; neither crossings nor optional cuts gate the existing equipment-acquisition orders.

## Existing puzzles become easier to observe

The cabinet displays each raised catch and its retracted retaining strip. Its shutter rod remains an actual cross-room linkage. The archive ornament casts a moving shadow; its aligned state is highlighted. Cleared intake channels show current, the lowered/raised lift remains visible, and the well has three visibly raised or lowered pawls. Tide seals are visible on the quay, ferry record and bronze mouths when lit; the signal remains circle–triangle–square (low–high–middle).

Story is attached to remnants and actions: ivy has darkened once-used windows, a cart is trapped in growth, parcels wait on both sides of a broken crossing, sailcloth obstructs a drain, and small cups survive behind hollow stones. Detailed prose remains available through explicit examination and the journal.

## Touch and save behavior

Tap a floor tile to walk. Tap an object to approach and operate it; selecting a matching tool applies it directly, including ranged hook targets. Ordinary examination uses the message strip. The explicit inspect control still opens the longer observation and records it in the journal. Major recovered tools retain a short acquisition dialog.

New saves add `toolRevision: 1` and lamp/cut/echo key arrays. Existing 1.2 journeys keep their lantern, positions, notes, observations and all mechanism state. New optional growth is pre-cleared only when it would overlap an existing player or moved cart. Earlier architectural migrations retain their existing relocation behavior. Undo restores light, cuts, crossings and discoveries along with the rest of the world.

## Verification

The complete existing campaign is exercised in three equipment-acquisition orders. Additional tests cover empty inventory, lantern discovery, dark reading, wall shadows, lamp persistence, window light, optional cuts, two-way crossings, cart pulls, hidden-object hit testing, bell discoveries, undo and old saves. Complete renderer frames cover every room with both explorer loading states and altered fixtures. Browser/device visual QA and human playtime/difficulty measurements remain outstanding.
