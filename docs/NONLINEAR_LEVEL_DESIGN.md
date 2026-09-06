# Hollowmere: The House of the Absent
## Nonlinear campaign replacement — level design
Design status: proposed campaign, not implemented. September 6, 2026.
Based on ajaxor/scratch main at 3ebb66bf0d0b5a1384eae0166f5dd49ab9312b5e.
Designer spoilers throughout. Room IDs below are new design IDs, not existing save IDs.

## 1. The experience
A monastery that once cared for travelers has become an enormous, still-working machine. The player explores its abandoned routines, learns how its parts connect, and restores five beacons in any order. The final mystery is whom the monastery was expecting.

Keep the six relics, five keepers, five regions, mobile grid movement, and intimate room scale. Replace the campaign's chain of individually solved trial rooms with 47 spaces that share water, light, sound, and history.

Target an unspoiled first play of roughly 2–4 hours, subject to human playtesting. Room count is not evidence of duration. Most time should be spent observing, forming theories, and choosing where to return.

The desired thought: “I saw something that could explain this in the laundry. But perhaps this glass does something else.”

Difficulty comes from:
- Recognizing relationships across rooms.
- Inferring a rule through harmless experiments.
- Separating a lack of understanding from a lack of equipment.
- Combining rules previously learned separately.
- Identifying relevant details within believable surroundings.

Do not promise absolute uncertainty forever: the player should eventually become confident that a hypothesis or tool is sufficient. That confidence is a reward.

## 2. What changes from the current game
The inspected source repeats a nine-room region layout: acquire a relic, follow six trials, kindle a beacon, optionally visit a memory. Regions unlock by beacon count. Several riddles literally state input sequences. The journal names the next region, the map prints the route, and objects name the relic they require.

Replace those structures as follows:

| Current structure | Replacement |
| --- | --- |
| Beacon count unlocks next region | Physical routes and shared mechanisms connect all five regions |
| One room type and one solved flag | Multiple objects, discoveries, and persistent effects per room |
| Each relic has an obvious matching obstacle | Broad material rules and several applications per relic |
| Puzzle classification and solution buttons | Neutral observation, collected inscriptions, player notes |
| Region trial checklist | One substantial regional mystery with clues elsewhere |
| A secret chest attached to each chain | Optional rooms with independent discoveries and useful perspectives |
| Every room completion is announced | Physical feedback where a mechanism changes; beacon events remain special |

This is a campaign and systems redesign, not a text-only difficulty setting.

## 3. World structure and pacing
H = The Last Watch; C = Cloister; T = Cistern; A = Archive; F = Foundry; O = Observatory; Z = final hearth.

The opening has three immediately usable exits: C1, T1, and A1. The foundry is reachable through C4; the observatory through A4. Neither requires a beacon or relic. The player can discover every region's exterior before solving a major puzzle.

Each region contains an accessible outer route, a deeper mystery, and an optional discovery. Their geometry must differ: the cloister wraps a courtyard, the cistern has stacked terraces, the archive doubles back around a reading hall, the foundry follows branching pipes, and the observatory climbs around a central shaft. Do not render these as five identical grids.

### Macro connections
All are bidirectional unless explicitly called a permanent shortcut. These are topological connections; stairs, passages, and room entrances still need tile-level authoring.

| Connection | Initial condition / later condition |
| --- | --- |
| H–C1, H–T1, H–A1 | Open |
| C4–F1 | Open service passage |
| A4–O1 | Open stair |
| C5–T5 | Submerged until LOW water; opens again whenever LOW |
| T6–A5 | Drain route at LOW water |
| A6–F4 | Permanent door unlatched from A6 |
| F6–O5 | Permanent lift unlocked with the Ember beacon |
| O4–C7 | Permanent stair unlatched from O4 |
| H–Z | Final hospitality puzzle, after all five beacons |

The F6–O5 lift is a convenience, never the only route to either room.

### Internal connections and gates
Omitted gates are open. A gate opens the stated edge, not every door in the room. Conditions are symmetric unless stated otherwise.

- Cloister: C1–C2, C2–C3, C3–C4, C4–C1; C4–C5 [Thornblade]; C5–C6; C6–C7; C7–C8 [Root mystery]; C5–C9 [Thornblade, local side growth]; C7–C2 [permanent shortcut opened at C7].
- Cistern: T1–T2, T1–T4, T2–T3; T4–T5 [LOW]; T5–T6 [LOW]; T3–T6 [Tidehook, all water levels]; T6–T7 [Tidehook]; T7–T8 [Tide mystery]; T5–T9 [LOW].
- Archive: A1–A2, A2–A3, A2–A4; A3–A5 [Prism reveals concealed latch]; A5–A6; A4–A7; A6–A7; A7–A8 [Memory mystery]; A5–A9 [local perspective puzzle].
- Foundry: F1–F2, F1–F4; F2–F3 [LOW pressure lift]; F1–F3 [Tidehook bypass]; F4–F5; F5–F6; F6–F7; F7–F8 [Ember mystery]; F4–F9 [optional Bell puzzle].
- Observatory: O1–O2, O1–O4; O2–O3 [Prism OR Bell, see acquisition]; O4–O5; O5–O6; O6–O7; O7–O8 [Dawn mystery]; O5–O9 [Stillglass, optional].

Reserve distinct door positions for each adjacency. Where more than four exits meet, use stairs or an alcove doorway rather than overlapping exits.

### Opening rhythm
Within approximately the first ten minutes, an exploring player should encounter:
- A conspicuous sealed deep door whose cause is not yet understood.
- An apparently decorative feature that responds to experimentation.
- Evidence of a remote connection: a pipe, waterline, or light shaft crossing a room boundary.
- A relic or a promising route to one.
- Several unanswered questions and at least two accessible destinations.

These are experience targets, not mandatory event order. Do not funnel every player through an introductory puzzle.

## 4. Relics and material rules
Explain controls plainly. Let advanced applications emerge through the environment. No pickup dialog lists every future use.

| Relic | Consistent rule | Applications |
| --- | --- | --- |
| Lantern | Portable light; can be placed on stable surfaces and retrieved | Cast shadows, reveal relief, kindle suitable material, become a weight of known size |
| Thornblade | Cuts exposed fibrous material | Prune growth, sever bindings, free a counterweight; cannot cut metal |
| Tidehook | Pulls a mobile ringed object toward the player, or pulls the player toward a fixed anchor | Move floating cargo, cross gaps, pull a latch from the wrong side |
| Dawn Prism | Refracts an existing beam; can occupy a stand or be carried | Separate overlapping marks, trace optical connections, expose relief through angled light |
| Echo Bell | Excites connected resonant material | Trace pipes, activate a distant tongue, compare solid and hollow cavities |
| Stillglass | Holds one targeted moving mechanism while the player moves; releasing restores motion | Hold a shadow, isolate a valve, keep a pendulum in a revealing position |

Relics are unique and never consumed. Essential fixtures accept an item only if the player can retrieve it or reach a return route. Lantern and Prism placement gets a visible empty inventory slot, not a lost-item state. Maintain a mundane minimum visibility level when the Lantern is placed.

Stillglass changes from the current room-wide twelve-step buff to one persistent targeted hold. No reflex timing: advance a mechanism through discrete phases, inspect a phase, then hold it. One held mechanism at a time; it remains held across rooms and saves.

### Acquisition mysteries
- **Thornblade, C3:** The blade hangs inside a gardener's glazed cabinet. Two cords raise counterweights, but the cabinet opens only while the shutter is closed: its warm wooden frame otherwise swells. C2 has repaired shutters, scrape marks, and a warped door that visibly settles when shaded. C3 lets the player test both cords and shade independently. Exact opening condition: both cord counterweights latched UP and the shutter CLOSED. Each cord latches independently, so one player can set both without a timing challenge. The frame visibly settles immediately on shading. Reward is a tool obtained by recognizing environmental causality, not guessing a word. No relic beyond the Lantern is needed.
- **Tidehook, T3:** Reached by exploration through the crowded ferry landing, past a hanging sail that can be walked behind. The hook is mixed with boat equipment and recognizable in silhouette. The sail's movement, worn path, and visible doorway edge establish the route without a glint or a secret hotspot.
- **Dawn Prism, A3:** A display cabinet's “missing” handle is a shadow made by its own iron ornament. Place the Lantern on the existing reader's stand and turn the ornament until its shadow completes a hand on the adjacent relief; then press that hand. A2 contains a small unrelated relief whose seam becomes visible under side light. The cabinet itself supplies visible alignment feedback.
- **Echo Bell, F3:** At LOW water, the hydraulic workshop lift settles to F2. Alternatively, use the Tidehook at F1 to reach its fixed landing. The Bell is then recoverable with ordinary interaction. Two approaches reward different exploration orders.
- **Stillglass, O3:** The shutter to the clock room has a light-sensitive tongue and a resonant linkage. From O2, either illuminate the tongue with the Prism or sound the Bell into the connected brass tube. Both produce the same visible movement. The glass is inside. Neither route requires a beacon.

No acquisition depends on the relic it awards. The secondary acquisition routes should be discoverable through real physical connections, not invisible “alternative solution” exceptions.

## 5. The five major mysteries
Each mystery can be completed before any other beacon. They share spaces and world states, but never require another beacon's flag. Finishing one permanently latches its beacon; later experiments cannot extinguish it.

### ROOT — The Orchard That Drinks Its Own Rain
Rooms: C2, C5, C6, C7; supporting evidence at T4.
Required: Thornblade. Shared water: MIDDLE for completion.

**First impression.** A dead tree grows around a sealed stone door. Elsewhere, several roots, trellises, ceramic drains, and ordinary plant beds make a large, untidy garden.

**Actual mechanism.** The beacon tree needs water without drowning, a live graft, and darkness at its root collar. Its supply travels through three rooms. The player must distinguish the tree's pale, spiraled root from two dark, straight roots belonging to other plants.

**Evidence.**
- C2: a healthy specimen has a shaded collar, a pale graft that joins above a dark parasitic shoot, and a basin with water halfway up its rim. Other healthy species look different.
- C5: cracks expose enough continuous root to trace the pale spiral through two junctions. A failed old graft remains visibly dead beside a successful one.
- C6: three branch gates carry actual water. Partial settings produce localized wet soil, trickles, or pooling; they do not display “1/3 correct.”
- T4: the operating wheel changes all basin levels. Waterlines persist at dry basins, making a remote explanation plausible.

**Exact solution.**
1. At C5, cut the dark shoot where it diverts the pale root's supply. Never cut the pale spiral.
2. At C6, open the branch connected to that pale root; close the lower drain bypass. The other plant branch may be open or closed and is irrelevant.
3. Close the C2 canopy whose shaft falls on the collar in C7.
4. Set T4 to MIDDLE. Return and observe new growth pulling the C7 door open.
5. Kindle C8 with the Lantern.

Cutting the wrong growth does not permanently destroy anything: growth regrows when the local irrigation lever is cycled. The live graft stays exposed and can be identified again. Once the correct tree awakens, its stone latch remains open.

**Inscription:** “What crowns the leaf must never crown the buried.”

**Reward.** A visibly revived courtyard, Root beacon, C7–C2 shortcut, and a new interpretation of the monastery's irrigation.

### TIDE — The Ferryman's Last Crossing
Rooms: T2, T4, T6, T7; supporting evidence at C1.
Required: Tidehook. Water changes LOW → HIGH during the solve.

**First impression.** An empty ferry hangs below a balcony. Rings cover posts, crates, mooring blocks, and a decorative ship model; their physical mounting determines their function.

**Actual mechanism.** A floating ferry and a stone counterweight share a chain. The ferry rises at HIGH water only if its cargo is balanced and the counterweight is released. Boarding from the ordinary shore then puts the player on the wrong side of a raised gangway.

**Evidence.**
- T2: a cutaway model demonstrates chain direction, and the ferry's maintenance sketch shows two matching cargo silhouettes.
- T6: a grounded cargo box leaves the deck visibly tilted; moving it changes the angle before the full puzzle is attempted.
- C1: an ordinary ringed cart moves when hooked, contrasting with fixed wall anchors.
- T7: a rear mooring ring is visible across the open upper arch, establishing a landing on the far bank.

**Exact solution.**
1. At LOW water, descend from T5 into T6. Hook the movable cargo box onto the vacant matching ferry footprint. Cargo markings and visible balance supply feedback.
2. Unpin the counterweight in T6. The chain now hangs free.
3. Return to T4 using the permanently accessible dry perimeter stair from T6 to the T3 landing; the last gap is hookable at every level.
4. Raise to HIGH. The now-balanced ferry rises to T7.
5. Enter T7 via the upper hook crossing. Pull the ferry toward the near mooring using its mobile ring; board it.
6. Cast to the fixed far-bank ring through the upper arch. Only the ferry's deck aligns with this ring: masonry occludes casts from both shore approaches, visibly rather than through a special rule. Lower the far gangway by hand; this permanently opens T8.
7. Kindle the beacon.

There is no timer. The ferry can always be pulled back from either bank. Water controls never strand the player; fixed high anchors and an emergency ladder remain reachable.

**Inscription:** “He crossed empty, and brought the shore behind him.”

**Reward.** Tide beacon; permanent gangway between the upper banks. Lower water later to discover the exposed T9 ferry shelter.

### MEMORY — The Saints Who Never Lived
Rooms: A2, A4, A7; evidence in C2, T2, F4, O4.
Required: Dawn Prism. No global water requirement.

**First impression.** Four named saints look down on a ceremonial table. Their titles and possessions seem like lore. Nearby household inventories describe the people who actually lived here.

**Actual mechanism.** The statues were recarved to turn ordinary keepers into saints. Four plaques are movable. Their current labels are unreliable. The statues preserve a final shared meal, at which each person carried a gift from another keeper. Identifying who made an object is only the first layer; dated records establish who held it at that last gathering.

**Evidence and original ownership.**
- C2 planting ledger: Mara repaired a split wooden bowl with three copper staples. Statue: that three-stapled bowl.
- T2 ferry inventory: Orin's oar has a fish-shaped repair at the handle. Statue: the same repair on a ceremonial staff.
- F4 workbench: Sera used a left-hand glove patched with square brass scales. Statue: the same glove partly hidden by an added sleeve.
- O4 star chart: Aven drew a seven-point star with one short ray on a folding stool. Statue: a folded object with that mark.
- A4 contains the four movable name plaques. These four records are available through the outer routes.
- A2 includes an unrecarved household memorial establishing that plaques name the person depicted, and a dated sketch identifying A7 as the last gathering rather than a portrait of the keepers at work.
- Later marginal entries record a cycle of gifts: Mara sent her mended bowl to the ferryman; Orin sent his repaired oar to the bellmaker to brace a broken door; Sera lent her patched glove to the watcher; Aven left her marked folding stool for the gardener. These records are placed with the corresponding original ownership evidence, and their later dates matter.
- The mundane objects in the statues match both the original repairs and the gift records. Unrelated devotional ornament has neither provenance nor wear.

**Exact solution.** Use the Prism's side-light positions at A7 to distinguish original possessions from later ornamental carving. Reconstruct the later gift transfers. Put Orin under the bowl, Sera under the repaired staff, Aven under the glove, and Mara under the folded stool. Then close the ceremonial screen: its apertures now frame the four original names. A mechanical latch releases A8.

The screen is a visible reader, not an arbitrary submit button. It can be opened again for corrections. Wrong arrangements cast broken letter shapes; no individual plaque lights green. No reading of medieval titles or outside religious knowledge is needed.

**Inscription:** “They gave us taller names, and smaller lives.”

**Reward.** Memory beacon; the four modest biographies become legible. A8 also provides the clearest evidence for the final guest-seat mystery.

### EMBER — A Bell With No Voice
Rooms: F4, F5, F6, F7; C4, T5.
Required: Echo Bell. T5 is accessible at LOW; the completed configuration functions at every water level.

**First impression.** Ringing the Bell at a socket produces several overlapping responses. Empty brackets suggest a missing instrument, but nothing needs to be collected.

**Actual mechanism.** A source pipe divides into three branches. Two return echoes interfere with the gate's listening tongue. The useful path needs one reflection and an intact loop; some things that look like pipe decorations are dampers.

**Explicit network.**
- Source in F5 → junction in F6.
- Branch WEST → C4 end cap → return into junction.
- Branch DOWN → T5 cistern resonator → return into junction.
- Branch UP → F7 bend → receiver in F6 → gate F8.
- C4 damper has BYPASS / RETURN positions.
- T5 damper has WET CHAMBER / SEALED TUBE positions.
- F7 bend has STRAIGHT / REFLECT positions.

**Exact solution.** Set C4 to BYPASS (removes its return), T5 to SEALED TUBE (isolates the water chamber and removes its return), and F7 to REFLECT (routes the remaining pulse into the receiver). Ring at F5. The single arriving pulse releases F8. Other combinations show pulses returning or escaping according to the network; there is no arbitrary hidden sequence.

**Evidence.**
- Pipe seams, mineral stains, and matching repair collars let players trace a branch between rooms.
- F4 has a short practice pipe beside a visibly padded bell. Covering its end absorbs a pulse; moving its elbow changes the visible destination.
- A struck pipe displays traveling dust and bracket vibration. An inspect view repeats the pulse locally with visual timing, including branching.
- A service mark at F6 depicts the listening tongue receiving a single stroke; double pulses visibly knock it back.

Ordinary hanging kettles also ring. They have short, local responses because they are not connected to the pipe system. Their behavior obeys the same acoustic rule.

**Inscription:** “A hundred mouths borrowed her voice. She answered when ninety-nine were still.”

**Reward.** Ember beacon; F6–O5 service lift. The pipe network remains usable, including a separate guest-room branch valve at F7 for the finale.

### DAWN — The Constellation Beneath Your Feet
Rooms: A6, O4, O5, O6, O7.
Required: Dawn Prism and Stillglass.

**First impression.** Star motifs repeat in floor mosaics, damaged charts, shutters, and a rotating observation arm. None carries a puzzle label.

**Actual mechanism.** A constellation is projected in layers through three rooms. Two layers are static; a third moves. The answer is a path across O7, seen only when those layers align.

**Exact authored solution.**
- O7 uses a 5-by-5 mosaic inset within the normal 17-by-13 room.
- Coordinates below are designer-only, measured from the inset's upper-left.
- Safe route: (1,5) → (2,5) → (2,4) → (3,4) → (3,3) → (4,3) → (4,2) → (5,2) → (5,1).
- A6's light selector goes EAST. Place the Prism in O4's stand, splitting the beam into two shafts.
- Rotate the O4 chart screen until the short ray on its seven-point star coincides with the fixed chipped column.
- At O6, advance the observation arm to the phase in which its forked shadow brackets the same short ray; hold that arm with Stillglass.
- The three projections then trace a continuous constellation on O7. Walk it from the worn southern threshold to the northern door.
- The completed traversal releases O8. Kindle its beacon and recover the Prism.

**Evidence.** The chipped column, short ray, and fork appear in repeated survey drawings at O4 and O5. The drawings show spatial alignment, not a numbered order. Misalignment visibly produces disconnected fragments. The corridor allows views between O6 and O7, and the held state persists across rooms.

A wrong step gently returns the player to the inset threshold without erasing projection settings. No damage, darkness punishment, or reflex requirement. Players who deduce the route from charts may traverse it without projecting it: knowledge is a legitimate shortcut.

**Inscription:** “The heavens kept moving. We learned where to stand.”

**Reward.** Dawn beacon; the dome opens and gives a recognizable overhead view of Hollowmere. The player realizes the monastery's layout also appears in small domestic models.

## 6. The final meta-puzzle — A Place for One More
Rooms: H, A2, A8, T4, A6, F7, Z.
Required: all five beacons; Lantern. The world arrangement may be prepared before the fifth beacon.

The sanctuary has six places: five windows surrounding a guest chair. The chair and its bowl have been visible from the start. Five beacons illuminate the windows individually; they do not automatically open the hearth.

At A8, the restored wall painting shows the keepers preparing a room for an absent guest. Its bowl is half-full, the west window casts a long shadow, and the bell is wrapped. A2 has a miniature room with the same plumbing, window geometry, and bell branch. The final relationship can be inferred from either the painting plus physical evidence or the model plus observations in H.

**Inscription:** “Five kept the house. None took the stranger's place.”

**Exact solution.**
1. Set T4 to MIDDLE: the actual sanctuary bowl fills halfway.
2. Set A6 to WEST: the sanctuary's west shaft lights the guest chair.
3. At F7 close the separate GUEST branch valve: H's small bell stops vibrating. This does not undo the Ember solve.
4. Place the Lantern on the guest chair's reading stand. Its shadow completes the missing sixth figure on the sanctuary wall.
5. With all five windows lit and those visible conditions met, the shadow's hand overlaps the hearth latch. Interact with it to enter Z.
6. In Z, leave the Lantern for the next traveler to complete the ending.

The complete room transforms before the door moves. Feedback is visible in H; no “requirements remaining” list is shown. The source of the WEST beam and the GUEST pipe are traceable before the ending.

The reveal is that the sanctuary was a puzzle the entire time, and ordinary hospitality was the machine's purpose.

## 7. Full room roster: 47 authored spaces
Functions overlap deliberately. A clue room can also contain a control for a different region.

| ID | Room | Main content and environmental character |
| --- | --- | --- |
| H | The Last Watch | Three initial paths, five windows, guest chair, half-bowl plumbing, final shadow latch |
| C1 | The Rain Porch | Arrivals' muddy boots, movable ringed cart, sightline into flooded stair |
| C2 | The Widow's Beds | Healthy plant evidence, Mara ledger, canopy control, later shortcut |
| C3 | The Gardener's Rest | Swollen cabinet and shutter puzzle; Thornblade |
| C4 | The Laundry Court | Sheets, rope repairs, acoustic bypass; foundry service passage |
| C5 | The Root Cellar | Traceable root junctions, graft intervention, low-water cistern crossing |
| C6 | The Three Gardens | Branch irrigation, different ordinary plant species, live hydraulic feedback |
| C7 | The Tree That Forgot | Root collar, dead tree, gate, observatory stair and courtyard shortcut |
| C8 | The Root Beacon | Awakened crown and light; visible changed garden |
| C9 | The Seed Between Stones | Optional Mara memory behind living side growth |
| T1 | The Broken Quay | Upper dry route, flood marks, view of controls and distant ferry |
| T2 | The Ferryman's Landing | Oar identity clue, ferry model, crowded sail passage |
| T3 | The Boat Shed | Tidehook among equipment; fixed high anchor, safe return landing |
| T4 | The Tide House | Three-position master water control, physical water gauge |
| T5 | The Undercroft | Acoustic damper, mineral collars, low-water crossings |
| T6 | The Hanging Ferry | Cargo balance, counterweight, hookable escape to T3 |
| T7 | The Far Bank | Upper ferry interaction, fixed far anchor, gangway latch |
| T8 | The Tide Beacon | Waterlit ceiling; permanent upper crossing |
| T9 | The Last Passenger | Optional low-water shelter and Orin memory |
| A1 | The Borrowers' Hall | Book carts, return slots, maplike domestic floor plan |
| A2 | The Gallery of Hands | Shadow-light evidence, household memorial, miniature guest room |
| A3 | The Glass Reading Room | Shadow cabinet puzzle; Dawn Prism; concealed deep latch |
| A4 | The False Saints | Four movable plaques, altered portraits, observatory stair |
| A5 | The Narrow Index | Concealed relief latch; low-water cistern exit; perspective side door |
| A6 | The Two Sunrises | EAST/WEST light selector; permanent foundry shortcut |
| A7 | The Hall of Borrowed Names | Four recarved statues, side-light stands, reading screen |
| A8 | The Memory Beacon | Restored ordinary lives and hospitality painting |
| A9 | The Name in the Margin | Optional Ilyen memory and changed perspective on a bookcase |
| F1 | The Ash Yard | Routes into workshop; fixed hook landing among ordinary crane rings |
| F2 | The Lift Well | Water-dependent lift; readable hoses leading toward T4 |
| F3 | The Bellmaker's Workshop | Echo Bell, unfinished domestic objects |
| F4 | The Menders' Bench | Sera identity clue; small acoustic experiment; archive shortcut |
| F5 | The Speaking Pipe | Bell input, first visible branching pulses |
| F6 | The Furnace Choir | Network junction, single-pulse tongue, observatory lift |
| F7 | The Empty Belfry | Reflector bend and separate guest branch valve |
| F8 | The Ember Beacon | Released listening gate and resonating beacon |
| F9 | The Little Bronze Bird | Optional Sera memory and hollow-wall bell discovery |
| O1 | The Open Stair | Unguarded ascent, weather instruments, visible clock-room linkage |
| O2 | The Blind Shutter | Light tongue and resonant tube; two ways into clock room |
| O3 | The Watcher's Threshold | Stillglass and harmless mechanism on which to try it |
| O4 | The Cartographer's Floor | Aven identity clue, star screen, Prism stand, cloister stair |
| O5 | The Broken Meridian | Survey evidence, alternate view into shadow shafts, lift landing |
| O6 | The Held Horizon | Stepwise observation arm and forked shadow |
| O7 | The Starless Floor | Five-by-five projected path; visible threshold and exit |
| O8 | The Dawn Beacon | Dome opening and monastery overview |
| O9 | There Is Still Time | Optional Aven memory beyond a held inspection hatch |
| Z | The Open Door | Leave the Lantern; ending and return to exploration |

### Optional discoveries with authored answers
These award five keeper memories and the fuller emotional ending. None is required for a beacon or mandatory clue.

- C9: prune the side growth; a tree has grown around a child's seat. The seed tin tucked in its broad visible hollow holds Mara's memory. The reward is the scene and letter, not a random hidden switch.
- T9: LOW water reveals a shelter beneath the landing. The seating is child-sized; a box contains the coins Orin gave his passengers and his memory.
- A9: at A5, view two broken shelf edges from the existing reading stool. They align into an open-hand motif matching the shelf's broad recessed handle. Pull that shelf to reveal Ilyen's marginal names. The handle is physically usable even before alignment is understood.
- F9: compare the same Bell strike against solid wall and the wall behind hanging pans. A longer visible vibration identifies a cavity. Slide the pans' rack and open the exposed inspection door; find the bronze bird and Sera's note.
- O9: hold an inspection hatch's counterweight with Stillglass and walk through its full-height opening. An inside release and exit handle always work. Aven's letter lies under an ordinary cup.

Do not add fake collectible counters to decorative items. Secondary discoveries should include views, histories, material-rule demonstrations, and shortcuts as well as inventory rewards.

## 8. Decoration, concealment, and information
The monastery should look occupied by former lives, not furnished by a puzzle author.

### Visual families
- Cloister: seed envelopes, drainage pottery, laundry, cut grafts, tools, stools.
- Cistern: cargo marks, patched sails, anchors, tariffs, flood sediment, fish bones.
- Archive: repairs, erased lettering, household inventories, damaged portraits, carts.
- Foundry: domestic castings, molds, pipe collars, soot, scrap, padded bells.
- Observatory: survey marks, stools, shutters, obsolete charts, roof repairs, cups.

Build most rooms from ordinary architecture and props, with several inspectable details but only a few consequential interventions. Many clues are simply visible. Some ordinary props can be moved or sounded without advancing a puzzle; their response remains physically truthful.

Puzzle objects use the same art family, scale, wear, and lighting as ordinary objects. No universal glow, gold outline, exclamation mark, special pedestal, or conspicuously empty puzzle arena. A decorative ring and a working ring look alike; whether the mounting is fixed or mobile predicts behavior.

Conceal the significance, not the hit target. On a phone:
- Relevant repairs and seams must be legible at normal room scale or in a neutral inspect view.
- Use generous tap targets and context selection where objects overlap.
- An inspect affordance may identify what can be observed, never whether it is a puzzle.
- Do not require tiny color differences, audio-only pitch matching, or holding a pixel-perfect position.
- Keep movement lanes clear even when wall and foreground decoration is dense.
- No critical clue exists only in flavor text that cannot be reread.

No arbitrary fake codes. A tally on cargo refers to cargo; it does not randomly match a lock. Decorative complexity should support coherent theories and let incorrect theories be tested.

### Riddle policy
One short thematic inscription per major mystery, located on a plausible physical object. The riddle suggests a relationship; the environment supplies sufficient evidence for the actual solution. Riddle-only interpretation must never be the sole gate.

Avoid “Use the Prism,” “The order is west, north, east,” and synonyms that amount to the same instruction. Also avoid procedural obscurity: do not make basic movement or item placement a riddle.

### Player-facing feedback
| Situation | Feedback |
| --- | --- |
| Hook used on fixed anchor | Chain tightens; player travels if the path is valid |
| Hook used on movable cargo | Cargo shifts; balance visibly changes |
| Wrong plant condition | Collar pools, dries, or remains exposed to light |
| Wrong acoustic routing | Pulse visibly returns, branches, or escapes |
| Wrong statue assignment | Reading screen frames broken lettering |
| Incomplete final room | Unlit window, incorrect bowl level, active bell, or missing shadow remains visible |

Avoid responses like “You don't have the right tool yet” and “This room's trial is incomplete.”

## 9. Progression and fairness audit
### Minimal requirements
| Goal | Required capability | Required knowledge/state | Other beacons |
| --- | --- | --- | --- |
| Thornblade | Lantern at most | Cabinet/shade relationship | None |
| Tidehook | None | Explore behind sail | None |
| Dawn Prism | Lantern | Shadow handle | None |
| Echo Bell | None OR Tidehook | LOW lift OR fixed upper anchor | None |
| Stillglass | Prism OR Bell | Light tongue OR resonant linkage | None |
| Root beacon | Thornblade, Lantern | Graft + canopy + MIDDLE water | None |
| Tide beacon | Tidehook, Lantern | Balance + chain + LOW/HIGH route | None |
| Memory beacon | Prism, Lantern | Original ownership + later gift transfers + reader screen | None |
| Ember beacon | Bell, Lantern | Three branch controls; visit T5 at LOW | None |
| Dawn beacon | Prism, Stillglass, Lantern | Projection alignment and path | None |
| Final hearth | Lantern | Guest tableau + all five beacons | All five |

The intended dependency graph has no beacon-order restriction. Every beacon permutation should be physically possible; implementation must verify this, especially after permanent shortcuts and temporary water routes interact.

### Three legal contrasting routes
1. Cistern first: explore T2/T3 → find Hook → solve Tide → reach Bell using the upper landing → explore Archive → obtain Prism and Glass → solve Dawn → return for Memory, Ember, and Root.
2. Knowledge first: obtain Prism → collect the four outer-route identity clues → solve Memory → use Prism to get Glass → solve Dawn → explore the water and pipe mysteries.
3. Service routes first: set LOW at T4 → collect Bell via F2 lift → configure C4/T5/F7 → solve Ember → obtain Glass with Bell → later obtain Prism for Dawn. Root can be solved independently whenever Blade is recovered.

These are designer walkthroughs, not journal routes.

### Preventing dead ends without guidance
- Place tools and all mandatory evidence on paths that cannot depend on the mystery they explain.
- Permanent beacon doors remain open; control mechanisms remain adjustable after completion.
- Water changes happen only at explicit control actions, never while the player is away due to a timer.
- Every water-accessible space needs a dry exit, fixed high anchor, or ladder appropriate to the player's possible inventory.
- Acquiring an item is permanent. Placed tools must remain retrievable across water and gate changes.
- Incorrect experiments change reversible states; no critical one-use resource.
- Never silently reset remote controls on room entry.
- Early optional shortcuts and knowledge-based sequence breaks are valid.
- When the player reaches Z, returning to H restores the Lantern for post-ending exploration. Keep the completed ending flag.

### Journal, map, undo
Remove escalating hints, explicit solutions, puzzle-type labels, route text, next-step directives, and automatic “solved room” checkmarks. Remove the fixed beacon-count ordering from all travel menus.

The journal stores only inspected text and deliberately recorded observations. Let the player add short notes or symbols. It never explains a relationship automatically. The map records visited rooms and discovered connections, with optional player pins; it does not color gates by current solvability.

Preserve save export/import and normal control help. Undo must include global state and remote object changes, so one action can be reversed honestly. Replace the old room-only reset with clearly scoped reset of a mechanism group, restoring its linked objects together while keeping collected relics and permanent doors. A reset is recovery, not a clue.

## 10. Implementation outline and validation
This document does not change the live game.

### Necessary engine work
1. Replace generated same-shape room chains with explicit room and connection definitions.
2. Replace one puzzle type per room with object components and named predicates.
3. Introduce persistent world state: water LOW/MIDDLE/HIGH; light EAST/WEST; named pipe valves; targeted held mechanism; placed relic locations; permanent latches.
4. Evaluate shared effects deterministically across unloaded rooms.
5. Give movement, hook targets, ferry positions, and water-dependent entrances explicit geometry.
6. Add optical paths across room boundaries, shadow alignment, and acoustic graph propagation.
7. Support readable decoration, inspections, and neutral interaction descriptions.
8. Remove hint/solution generation and hardcoded progression language in the UI.
9. Version campaign saves separately. Existing v1 progress must remain exportable; offer the new campaign as a fresh journey rather than interpreting old room indices as new progress.

Relevant existing files: dist/content.js, dist/engine.js, dist/game.js, dist/renderer.js, tests/campaign.test.js, tests/navigation.test.js. The current 17-by-13 room grid can remain, but some mechanisms span several grids.

### Build order
Start with a playable connected slice H/C1–C7/T1–T6/F1–F4: movement loops, water, Hook behavior, Blade acquisition, shared irrigation, and believable clutter. Then add Archive identity/light mechanics, the full acoustic network, Observatory projection, and the finale. The slice is an implementation order, not a player's region order.

### Required verification once implemented
- Graph traversal: all outer routes reachable from a fresh save with no beacons.
- Solve each beacon first from a fresh campaign; enumerate all 120 beacon orders at the progression level.
- Execute representative movement-level solutions for all five mysteries and both alternate acquisition routes.
- Check every water change with the player on each reachable shore and with unique tools placed on every permitted stand.
- Check global undo, save/reload, and targeted holds across room transitions.
- Check final guest tableau before and after fifth-beacon acquisition.
- Confirm wrong cuts, ferry settings, projection steps, and pipe settings are recoverable.
- Read all player-visible text for accidental solutions, tool requirements, and route directives.
- Human playtest on a phone: distinguish “I have a theory to test” from “I have no usable information.” Observe backtracking time and prop legibility.
- Record completion times rather than asserting the campaign lasts hours.

If testers miss a relationship, improve its physical evidence or repeat it in another believable setting. Do not automatically add an explanatory pop-up. If they solve it quickly by understanding it, that is success; add richer deductions elsewhere rather than hiding the clue further.
