import{addToolPlay}from'./tool-content.js';
import{WORKS_ROOMS,WORKS_RELICS}from'./works-content.js';
import { architecturalExits } from './architecture.js';
export const W=17,H=13;
export const CAMPAIGN='absent-opening';
export const LAYOUT_REVISION=2;
export const RELICS={...WORKS_RELICS,
  "lantern": {
    "name": "Lantern",
    "short": "Lantern",
    "sprite": 8,
    "description": "A small, stubborn light. It fits comfortably in the hand, or on a reading stand."
  },
  "blade": {
    "name": "Thornblade",
    "short": "Blade",
    "sprite": 9,
    "description": "A narrow blade, worn smooth where a gardener rested her thumb. The edge still holds."
  }
};
export const ZONES=[
  {
    "id": "grove",
    "name": "The Overgrown Cloister",
    "color": "#86b89a",
    "tint": "#183c2a"
  },
  {
    "id": "tides",
    "name": "The Sunken Cistern",
    "color": "#73c6d2",
    "tint": "#113b48"
  },
  {
    "id": "archive",
    "name": "The Moonlit Archive",
    "color": "#b4a5d5",
    "tint": "#302c4c"
  }
];
export const DIRS={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};
export const OPPOSITE={N:'S',S:'N',E:'W',W:'E'};
export const ROOMS={...structuredClone(WORKS_ROOMS),
  "H": {
    "id": "H",
    "name": "The Last Watch",
    "zone": -1,
    "index": 0,
    "coord": [
      0,
      2
    ],
    "arrival": "The hall narrows toward an empty chair. Rain runs in a covered gutter beneath the northern arch.",
    "objects": [
      {
        "id": "chair",
        "type": "prop",
        "x": 8,
        "y": 3,
        "name": "The guest chair",
        "text": "The seat is polished by use. Five dark niches face it. There is room for someone to sit.",
        "furnishing": 11
      },
      {
        "id": "guest-stand",
        "type": "stand",
        "x": 7,
        "y": 3,
        "name": "A reading stand",
        "text": "A little shelf beside the empty chair.",
        "furnishing": 8
      },
      {
        "id": "bowl",
        "type": "prop",
        "x": 10,
        "y": 3,
        "name": "A mended bowl",
        "text": "Three copper staples hold the wood together. The bowl is dry; a thin pipe ends above its rim.",
        "furnishing": 10
      },
      {
        "id": "guest-words",
        "type": "inscription",
        "x": 5,
        "y": 2,
        "name": "Words above the hearth",
        "text": "Five kept the house. None took the stranger’s place."
      },
      {
        "id": "guest-pipe",
        "type": "prop",
        "x": 13,
        "y": 6,
        "name": "A bronze pipe",
        "text": "A narrow branch runs west, disappearing into the old masonry.",
        "furnishing": 13
      },
      {
        "id": "window-0",
        "type": "niche",
        "x": 4,
        "y": 2,
        "name": "An empty niche",
        "text": "Cold glass. Whatever once shone here has gone dark."
      },
      {
        "id": "window-1",
        "type": "niche",
        "x": 6,
        "y": 2,
        "name": "An empty niche",
        "text": "Cold glass. Whatever once shone here has gone dark."
      },
      {
        "id": "window-2",
        "type": "niche",
        "x": 8,
        "y": 2,
        "name": "An empty niche",
        "text": "Cold glass. Whatever once shone here has gone dark."
      },
      {
        "id": "window-3",
        "type": "niche",
        "x": 10,
        "y": 2,
        "name": "An empty niche",
        "text": "Cold glass. Whatever once shone here has gone dark."
      },
      {
        "id": "window-4",
        "type": "niche",
        "x": 12,
        "y": 2,
        "name": "An empty niche",
        "text": "Cold glass. Whatever once shone here has gone dark."
      },
      {
        "id": "bench",
        "type": "prop",
        "x": 3,
        "y": 8,
        "name": "A waiting bench",
        "text": "Someone has repaired the same leg twice.",
        "furnishing": 8,
        "w": 2,
        "h": 1
      },
      {
        "id": "linen",
        "type": "prop",
        "x": 12,
        "y": 9,
        "name": "Folded linen",
        "text": "Dry cloth, laid out for travelers who never arrived.",
        "furnishing": 7
      },
      {
        "id": "refuge-charter",
        "type": "inscription",
        "x": 3,
        "y": 3,
        "name": "The admission stone",
        "text": "When the river took the bridge, the east porch became a landing. When winter took the road, the garden rooms became a house. No guest was asked how long they would stay."
      }
    ]
  },
  "C1": {
    "id": "C1",
    "name": "The Rain Porch",
    "zone": 0,
    "index": 1,
    "coord": [
      0,
      1
    ],
    "arrival": "The roof bends around a rain garden. Through the arcade, a pale tree rises from a broken basin.",
    "objects": [
      {
        "id": "cart",
        "type": "prop",
        "x": 10,
        "y": 10,
        "name": "A handcart",
        "text": "The cart stands in an unloading recess. Its ring is tarnished; the wheel ruts turn toward the laundry, not the guest hall.",
        "furnishing": 14,
        "movable": true,
        "w": 2,
        "h": 1
      },
      {
        "id": "sail",
        "type": "prop",
        "x": 5,
        "y": 2,
        "name": "A rolled awning",
        "text": "A spare awning rests beneath the sound part of the roof. The older brackets continue around the garden.",
        "furnishing": 12
      },
      {
        "id": "porch-pot",
        "type": "prop",
        "x": 2,
        "y": 7,
        "name": "A cracked planter",
        "text": "Rainwater escapes through a crack rather than its blocked drain.",
        "furnishing": 6
      },
      {
        "id": "porch-bench",
        "type": "prop",
        "x": 5,
        "y": 7,
        "name": "A porch bench",
        "text": "A bench faces the rain garden. Beneath it the paving is dry; above it, the roof has been repaired with shorter rafters.",
        "furnishing": 8
      },
      {
        "id": "porch-stone",
        "type": "inscription",
        "x": 2,
        "y": 1,
        "name": "A weathered lintel",
        "text": "The house remembers the weight of a hand."
      },
      {
        "id": "waterline",
        "type": "mark",
        "x": 7,
        "y": 9,
        "name": "A tide mark",
        "text": "A shallow gutter follows the sheltered walk. Fresh water enters from the garden above; silt gathers at the bend.",
        "floor": true
      },
      {
        "id": "court-stone",
        "type": "mark",
        "x": 6,
        "y": 9,
        "name": "The rain garden",
        "text": "The great tree has grown over the basin rim. A broken branch points toward the workshop windows. The arcade continues around it.",
        "floor": true
      }
    ]
  },
  "C2": {
    "id": "C2",
    "name": "The Widow’s Beds",
    "zone": 0,
    "index": 2,
    "coord": [
      0,
      0
    ],
    "arrival": "The garden climbs in shallow terraces. Water slips beneath the sheltered bed; the old tree leans above the eastern court.",
    "objects": [
      {
        "id": "healthy",
        "type": "prop",
        "x": 4,
        "y": 5,
        "name": "A pale-leaved plant",
        "text": "Beside the raised bed, pale roots curl into a bowl half full of water. Its leaf collar lies under the garden canopy.",
        "furnishing": 6
      },
      {
        "id": "dry",
        "type": "prop",
        "x": 11,
        "y": 8,
        "name": "A different plant",
        "text": "Dry soil fills the higher bed. Its small dark leaves and straight roots differ from the pale plant below.",
        "furnishing": 6
      },
      {
        "id": "shade-wheel",
        "type": "shade",
        "x": 14,
        "y": 2,
        "name": "A wooden wheel",
        "text": "A square shaft runs from the wheel, through a repaired frame, and onward into the eastern wall.",
        "furnishing": 4
      },
      {
        "id": "frame",
        "type": "prop",
        "x": 15,
        "y": 2,
        "name": "A repaired frame",
        "text": "The wood bears curved scrape marks beside its brass lip. Fine sawdust lies beneath it.",
        "furnishing": 4
      },
      {
        "id": "garden-words",
        "type": "inscription",
        "x": 2,
        "y": 7,
        "name": "An old garden stone",
        "text": "What crowns the leaf must never crown the buried."
      },
      {
        "id": "mara-ledger",
        "type": "prop",
        "x": 3,
        "y": 10,
        "name": "The planting ledger",
        "text": "Mara’s hand fills the margins: “Three staples for the bowl. It will last another winter.” A later line reads: “The ferryman may keep it. He feeds more mouths than I.”",
        "furnishing": 9
      },
      {
        "id": "garden-stand",
        "type": "stand",
        "x": 8,
        "y": 6,
        "name": "A low shelf",
        "text": "A dry shelf built into the planting bed.",
        "furnishing": 8
      },
      {
        "id": "shaft",
        "type": "mark",
        "x": 15,
        "y": 4,
        "name": "The shutter shaft",
        "text": "The same square timber runs along the wheel bay and through the workshop wall. The joint is dark with old grease.",
        "floor": true
      },
      {
        "id": "garden-drain",
        "type": "mark",
        "x": 6,
        "y": 8,
        "name": "A garden drain",
        "text": "A stone channel runs beneath the planted terraces, then bends toward the covered porch. Grit has collected where its slope changes.",
        "floor": true,
        "archArt": 15
      }
    ]
  },
  "C3": {
    "id": "C3",
    "name": "The Gardener’s Rest",
    "zone": 0,
    "index": 3,
    "coord": [
      1,
      0
    ],
    "arrival": "The covered walk enters a working room. A cabinet fills the window bay; behind the bench, a narrow passage turns toward the laundry.",
    "objects": [
      {
        "id": "cabinet",
        "type": "cabinet",
        "x": 8,
        "y": 2,
        "name": "A glazed cabinet",
        "text": "A slender blade rests behind cloudy glass.",
        "furnishing": 0
      },
      {
        "id": "left-cord",
        "type": "cord",
        "x": 6,
        "y": 2,
        "name": "A knotted cord",
        "text": "The cord passes over a brass pulley into the cabinet’s left catch.",
        "furnishing": 3,
        "index": 0
      },
      {
        "id": "right-cord",
        "type": "cord",
        "x": 10,
        "y": 2,
        "name": "A braided cord",
        "text": "The cord passes over a brass pulley into the cabinet’s right catch.",
        "furnishing": 3,
        "index": 1
      },
      {
        "id": "shutter",
        "type": "shutter",
        "x": 3,
        "y": 2,
        "name": "Wooden shutters",
        "text": "A square shaft enters from the western wall. The shutters have no handle on this side.",
        "furnishing": 5
      },
      {
        "id": "rest-stool",
        "type": "prop",
        "x": 5,
        "y": 5,
        "name": "A low stool",
        "text": "The stool faces the working bench. A polished arc in the floor marks where its occupant turned toward the cabinet.",
        "furnishing": 8
      },
      {
        "id": "rest-pot",
        "type": "prop",
        "x": 13,
        "y": 6,
        "name": "An untended pot",
        "text": "The soil has hardened around a broken label.",
        "furnishing": 6
      },
      {
        "id": "cabinet-words",
        "type": "inscription",
        "x": 8,
        "y": 4,
        "name": "A line on the worktable",
        "text": "Two hands hold what the day will not release."
      },
      {
        "id": "rest-stand",
        "type": "stand",
        "x": 7,
        "y": 5,
        "name": "The worktable",
        "text": "A long working bench divides the delivery door from the window bay. A lamp-sized patch remains clear at its end.",
        "furnishing": 8,
        "w": 3,
        "h": 1
      },
      {
        "id": "delivery-wear",
        "type": "mark",
        "x": 12,
        "y": 9,
        "name": "Worn delivery stones",
        "text": "Wheels have polished the stones between the laundry door and the workbench. The older garden-facing threshold shows only footsteps.",
        "floor": true
      }
    ]
  },
  "C4": {
    "id": "C4",
    "name": "The Laundry Court",
    "zone": 0,
    "index": 4,
    "coord": [
      1,
      1
    ],
    "arrival": "Cool water rests in long washing troughs. Linen screens the dry walk; a service pipe follows the older stonework.",
    "objects": [
      {
        "id": "linen-one",
        "type": "prop",
        "x": 4,
        "y": 6,
        "name": "Hanging linen",
        "text": "One sheet has been darned with blue thread. The stitches form no pattern.",
        "furnishing": 7,
        "floor": true,
        "screen": true,
        "visualWidth": 2.3,
        "visualHeight": 2
      },
      {
        "id": "linen-two",
        "type": "prop",
        "x": 6,
        "y": 10,
        "name": "A faded curtain",
        "text": "Soap has bleached the lower hem.",
        "furnishing": 15,
        "floor": true,
        "screen": true,
        "visualWidth": 2,
        "visualHeight": 2.5
      },
      {
        "id": "binding",
        "type": "binding",
        "x": 13,
        "y": 4,
        "name": "A bound trellis",
        "text": "Living shoots twist through the slats. Beyond them, the stone floor continues.",
        "furnishing": 7
      },
      {
        "id": "pipe",
        "type": "prop",
        "x": 9,
        "y": 5,
        "name": "A patched pipe",
        "text": "The patched tube follows the old wall above the washing troughs. One branch returns toward the porch; another descends beside the service stair.",
        "furnishing": 13
      },
      {
        "id": "damper",
        "type": "damper",
        "x": 11,
        "y": 5,
        "name": "A pipe sleeve",
        "text": "The sleeve turns between two worn stops. No vibration reaches it.",
        "furnishing": 13
      },
      {
        "id": "cloth-bench",
        "type": "prop",
        "x": 5,
        "y": 9,
        "name": "A washing bench",
        "text": "A few pins remain in a shallow dish.",
        "furnishing": 8,
        "w": 2,
        "h": 1
      },
      {
        "id": "seed-note",
        "type": "prop",
        "x": 15,
        "y": 5,
        "name": "A folded page",
        "text": "“I planted the trees far apart, so there would be room for everyone to come back.” Beneath it, a pressed leaf has kept its color.",
        "furnishing": 9,
        "discovery": "garden-letter"
      },
      {
        "id": "root-boundary",
        "type": "boundary",
        "x": 15,
        "y": 2,
        "name": "The root stair",
        "text": "The stair descends between pale roots.",
        "furnishing": 15,
        "archArt": 8
      },
      {
        "id": "foundry-boundary",
        "type": "boundary",
        "x": 11,
        "y": 11,
        "name": "A service passage",
        "text": "Warm brick gives way to darkness beyond the laundry.",
        "furnishing": 15,
        "archArt": 8
      },
      {
        "id": "wash-trough",
        "type": "mark",
        "x": 7,
        "y": 7,
        "name": "The washhouse basin",
        "text": "The low trough has been fitted between much older garden walls. Its overflow escapes into a grated channel along the dry walk.",
        "floor": true
      }
    ]
  },
  "T1": {
    "id": "T1",
    "name": "The Broken Quay",
    "zone": 1,
    "index": 5,
    "coord": [
      1,
      2
    ],
    "arrival": "The passage opens above the river. An old loading stair falls toward a lower quay, while the high causeway follows the bank.",
    "objects": [
      {
        "id": "quay-sail",
        "type": "prop",
        "x": 4,
        "y": 3,
        "name": "A patched sail",
        "text": "A bundled sail occupies a dry store beside the loading stair. The same blue repair thread appears in the laundry.",
        "furnishing": 12,
        "screen": true
      },
      {
        "id": "quay-cart",
        "type": "prop",
        "x": 4,
        "y": 8,
        "name": "A cargo trolley",
        "text": "A wheeled frame with a fixed ring on its handle. Silt has dried around its wheels.",
        "furnishing": 14
      },
      {
        "id": "tide-marks",
        "type": "mark",
        "x": 8,
        "y": 6,
        "name": "Three tide lines",
        "text": "Three stains stripe the quay wall. Below the loading stair, the lowest landing is submerged. The high causeway remains dry.",
        "floor": true
      },
      {
        "id": "cistern-boundary",
        "type": "boundary",
        "x": 14,
        "y": 6,
        "name": "The far landing",
        "text": "A dry ledge continues around the water.",
        "furnishing": 15,
        "archArt": 8
      },
      {
        "id": "fare",
        "type": "inscription",
        "x": 6,
        "y": 6,
        "name": "A ferry notice",
        "text": "One coin each. No one left behind."
      },
      {
        "id": "quay-bollard",
        "type": "prop",
        "x": 10,
        "y": 7,
        "name": "An old mooring",
        "text": "The mooring is cut into the high causeway. Beneath it, a second ring disappears under the water.",
        "archArt": 3
      }
    ]
  },
  "A1": {
    "id": "A1",
    "name": "The Borrowers’ Hall",
    "zone": 2,
    "index": 6,
    "coord": [
      -1,
      2
    ],
    "arrival": "Shelves turn the passage twice before it opens into a quiet reading apse. A chair waits beneath the high window.",
    "objects": [
      {
        "id": "book-cart",
        "type": "prop",
        "x": 3,
        "y": 4,
        "name": "A book cart",
        "text": "Ordinary names cover the spines. The kings occupy only one shelf.",
        "furnishing": 14
      },
      {
        "id": "borrowers-ledger",
        "type": "prop",
        "x": 6,
        "y": 9,
        "name": "A household inventory",
        "text": "Six places laid. Five windows cleaned. The guest’s bell wrapped for the night.",
        "furnishing": 9
      },
      {
        "id": "reader-stand",
        "type": "stand",
        "x": 8,
        "y": 5,
        "name": "A reading stand",
        "text": "A small lip keeps a lamp from sliding off the table.",
        "furnishing": 8
      },
      {
        "id": "relief",
        "type": "relief",
        "x": 9,
        "y": 5,
        "name": "An iron ornament",
        "text": "A hand is carved into the wall behind the ornament.",
        "furnishing": 13
      },
      {
        "id": "archive-chair",
        "type": "prop",
        "x": 7,
        "y": 7,
        "name": "An empty chair",
        "text": "The arms have been polished smooth.",
        "furnishing": 11
      },
      {
        "id": "archive-boundary",
        "type": "boundary",
        "x": 8,
        "y": 2,
        "name": "The inner gallery",
        "text": "Shelves recede into an unlit gallery.",
        "furnishing": 15,
        "archArt": 8
      },
      {
        "id": "names",
        "type": "inscription",
        "x": 12,
        "y": 4,
        "name": "A note in the margin",
        "text": "They gave us taller names, and smaller lives."
      },
      {
        "id": "old-arch",
        "type": "inscription",
        "x": 4,
        "y": 3,
        "name": "An older arch",
        "text": "The shelves stop short of an old exterior arch. Rain once fell here. A mason has filled the opening with stone from the ruined bridge."
      }
    ]
  }
};
export const exitsFor=architecturalExits;
ROOMS.A1.objects.push({id:'ornament',type:'ornament',x:9,y:4,name:'An iron ornament',text:'',floor:true,propSprite:4});
ROOMS.T1.objects.find(o=>o.id==='cistern-boundary').type='mark';
ROOMS.T1.objects.find(o=>o.id==='cistern-boundary').floor=true;
ROOMS.T1.objects.find(o=>o.id==='tide-marks').text='Three stains cross the quay: the lowest touches a carved departing boat, the highest a bridge, and the middle a boat drawn against its mooring.';
ROOMS.C4.objects.find(o=>o.id==='root-boundary').type='mark';
ROOMS.C4.objects.find(o=>o.id==='root-boundary').text='Above the old root stair, a dry service aisle turns into the ferry records. Book-cart wheels have worn its sill.';
ROOMS.C4.objects.find(o=>o.id==='root-boundary').floor=true;
ROOMS.C3.objects.push({id:'linkage',type:'linkage',x:11,y:2,name:'A brass eccentric',text:'',floor:true});
ROOMS.C2.objects.find(o=>o.id==='frame').text='The square shaft passes through this bracket. An offset brass pin follows its rotation toward the workshop.';
ROOMS.H.objects.find(o=>o.id==='window-0').text='Blue glass fragments cling to this niche. Its socket has five sides; below it is a small ferry boat.';
addToolPlay(ROOMS);
export const OBJECTS=Object.fromEntries(Object.values(ROOMS).flatMap(r=>r.objects.map(o=>[r.id+':'+o.id,{...o,room:r.id}])));
