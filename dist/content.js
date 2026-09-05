export const W=17,H=13;
export const RELICS={
 lantern:{name:'Lantern',short:'Lantern',sprite:8,description:'A small, stubborn light. Use it to kindle braziers and reveal the pale marks left in forgotten rooms.',use:'Stand beside a brazier or a veiled rune and use the lantern.'},
 blade:{name:'Thornblade',short:'Blade',sprite:9,description:'The gardener’s blade. It parts the living thorns that have sealed the garden. Nothing cut by this blade stays angry for long.',use:'Stand beside a vine, then use the blade.'},
 hook:{name:'Tidehook',short:'Hook',sprite:10,description:'A ferryman’s hook, light as a promise. It carries you across water to a ring directly ahead.',use:'Face a brass ring across water, then use the hook. Rings must be in a straight line.'},
 prism:{name:'Dawn Prism',short:'Prism',sprite:11,description:'The archivists bottled a little sunrise. Use it at a light source to wake a beam; turn mirrors to carry the light home.',use:'Use the prism beside an unlit emitter. Interact with mirrors to turn them.'},
 bell:{name:'Echo Bell',short:'Bell',symbol:'♧',description:'A bell with no clapper, ringing with the voices of the monastery. Its sound turns a rune and its two neighbors together.',use:'Use the bell beside a resonator. It toggles that rune and its neighbors.'},
 hourglass:{name:'Stillglass',short:'Glass',symbol:'⧖',description:'Seven grains of borrowed time. Freeze the mechanisms of a room for twelve footsteps.',use:'Use anywhere to freeze time for twelve moves. Can be used again when time resumes.'}
};
export const ZONES=[
 {id:'grove',name:'The Overgrown Cloister',short:'Cloister',color:'#86b89a',tint:'#183c2a',relic:'blade',beacon:'Root',keeper:'Mara, the gardener',intro:'Mara planted a tree for every traveler who never made it home. When the monastery fell silent, she kept planting.',memory:'Mara’s last seed',memoryText:'“They called it a garden of the missing. But I planted the trees far apart, so there would be room for everyone to come back.”',epilogue:'The roots loosen their grip. Somewhere above, a tree puts out its first new leaf.',rooms:[
 ['The Gardener’s Rest','relic','A blade rests among the roots. Take it, and the garden may remember its paths.'],
 ['The Patient Stones','weights','Two travelers kneel. Two stars await. Let stone carry the weight.','w1'],
 ['A Language of Embers','sequence','Morning is born in the east, rests in the south, and sleeps in the west. The north keeps its watch.','fire1'],
 ['The Rootbound Walk','vines','The garden has closed its hands around three sleeping seeds. Wake every seed.','vines1'],
 ['The Unwritten Path','runes','Bring the lantern close. Follow the old keeper’s marks: leaf, rain, sun, moon.','runes1'],
 ['The Gardener’s Burden','weights','The stone closest to its star need not be the first to move.','w2'],
 ['The Last Green Door','sequence','A seed drinks rain, reaches for dawn, leans into noon, and dreams beneath stars. Water, east, south, north.','fire2'],
 ['The Root Beacon','beacon','Six small acts of care. One light to guide the lost.'],
 ['A Seed in the Dark','secret','Some things grow best away from the path. Bring a light.']
 ]},
 {id:'tides',name:'The Sunken Cistern',short:'Cistern',color:'#73c6d2',tint:'#113b48',relic:'hook',beacon:'Tide',keeper:'Orin, the ferryman',intro:'When the lower halls flooded, Orin made a boat from the chapel doors. He never asked who deserved a place in it.',memory:'The ferryman’s fare',memoryText:'“One coin each,” Orin told the frightened children. Then he put a coin into every small hand. The ferry ran all night.',epilogue:'The tide falls quiet. A distant bell sounds once across the water.',rooms:[
 ['The Ferryman’s Landing','relic','A hook hangs where a boat once waited. Across the water, the brass rings have not rusted.'],
 ['Islands of Silence','anchors','Follow the brass rings. A straight cast crosses any water. Wake the three tide stones.','hook1'],
 ['The Three Sluices','valves','The old pressure marks read II · IV · I. Set each wheel to its mark, then open the sluice.','valve1'],
 ['A Weight Below Water','weights','The ferryman balanced his cargo before casting off. Balance these stones.','w3'],
 ['The Long Crossing','anchors','Not every ring is the next ring. Change direction on dry land.','hook2'],
 ['The Floodkeeper’s Ledger','valves','The first wheel bears one. The second bears twice the first. The last bears their sum.','valve2'],
 ['Lanterns on the Water','sequence','The ferry calls at the west bank, the north stairs, the east quay, then the southern shore.','fire3'],
 ['The Tide Beacon','beacon','A light for those who crossed, and those who carried them.'],
 ['One Last Passenger','secret','A dry page survived the flood. Reveal the mark, then open the chest.']
 ]},
 {id:'archive',name:'The Moonlit Archive',short:'Archive',color:'#b4a5d5',tint:'#302c4c',relic:'prism',beacon:'Memory',keeper:'Ilyen, the archivist',intro:'Ilyen was ordered to save the histories of kings. Instead, she filled the vault with ordinary names.',memory:'A page without a king',memoryText:'“Tessa mended the blue roof. Hal laughed in his sleep. Ren made excellent soup.” Beneath these names: “If we remember only the great, we forget almost everyone.”',epilogue:'Ink rises from the faded pages. Thousands of ordinary names return to the world.',rooms:[
 ['The Glass Reading Room','relic','The prism catches a dawn that never reached these halls. Take it to the sleeping light sources.'],
 ['A Borrowed Sunrise','mirrors','Wake the source with the prism. Turn the mirrors until the light reaches the crystal.','mirror1'],
 ['The Weight of Names','weights','No name is heavier than another. The stones, however, disagree.','w4'],
 ['Between the Lines','runes','A reader begins at the moon, follows the leaf, finds the rain, and closes with the sun.','runes2'],
 ['The Bent Horizon','mirrors','Light can travel a long way without ever leaving this room.','mirror2'],
 ['The Librarian’s Night','sequence','Before sleep: close the west window, bank the southern fire, watch the north star, greet the eastern dawn.','fire4'],
 ['The Unbroken Thread','mirrors','Four corners of a story. Carry one beam through them all.','mirror3'],
 ['The Memory Beacon','beacon','A light for every life too small for the history books.'],
 ['An Ordinary Name','secret','The smallest shelf holds the most important book.']
 ]},
 {id:'forge',name:'The Silent Foundry',short:'Foundry',color:'#db9a72',tint:'#49302a',relic:'bell',beacon:'Ember',keeper:'Sera, the bellmaker',intro:'Sera cast the great alarm bell. When the dark came, she melted it down to make a hundred smaller bells, one for every door.',memory:'The bellmaker’s hands',memoryText:'The workshop ledger lists no weapons. Only door hinges, kettle handles, a little bronze bird. “Let someone else build something that lasts,” she wrote. “I will build something that helps.”',epilogue:'For the first time in years, the foundry rings with a clear, unbroken note.',rooms:[
 ['The Bellmaker’s Workshop','relic','A silent bell waits on the anvil. Sound it beside the listening runes.'],
 ['The Listening Stones','resonance','Each note wakes its own stone and the two beside it. Let every stone shine.','echo1'],
 ['The Furnace Choir','sequence','The furnace keeper sings: south, east, north, west. Keep the song in order.','fire5'],
 ['A Measure of Brass','weights','Make room before you make progress. A careful step back can open the way.','w5'],
 ['The Broken Chord','resonance','One voice changes its neighbors. Find the notes that make the whole circle sing.','echo2'],
 ['The Tempering Wheels','valves','Cool the alloy in this order of pressure: IV · I · III.','valve3'],
 ['The Great Resonator','resonance','The oldest bells need the fewest notes. Make every rune shine.','echo3'],
 ['The Ember Beacon','beacon','A light for the hands that made this place a home.'],
 ['The Little Bronze Bird','secret','It never learned to fly. It was loved all the same.']
 ]},
 {id:'stars',name:'The Starless Observatory',short:'Observatory',color:'#abbfe7',tint:'#202b4b',relic:'hourglass',beacon:'Dawn',keeper:'Aven, the last watcher',intro:'Aven watched the stars go out one by one. She left the observatory unlocked. Even at the end, she expected company.',memory:'The last watcher’s letter',memoryText:'“I was wrong about the dark. It was never a thing that came for us. It was all the lights we stopped tending. If you are reading this, there is still time.”',epilogue:'The roof opens. Beyond the broken dome, the first star returns.',rooms:[
 ['The Watcher’s Threshold','relic','A glass full of stillness. Borrow its time, but remember to give time back.'],
 ['Twelve Borrowed Steps','timed','Set the clock, then cross the marked path before the gate closes. Stillglass can hold the moment.','time1'],
 ['The Celestial Engine','mirrors','Dawn has forgotten the way. Four mirrors can remind it.','mirror4'],
 ['The Weight of Tomorrow','weights','What you carry matters less than where you set it down.','w6'],
 ['The Stars Remember','runes','The last constellation reads: rain, moon, leaf, sun. Bring your lantern.','runes3'],
 ['A Moment Held Open','timed','Two shores, one moment. Set the clock, still the glass, then cast for the far ring.','time2'],
 ['The Final Chord','resonance','Five keepers. Five promises. Let all five voices shine together.','echo4'],
 ['The Dawn Beacon','beacon','One light remains to be carried home.'],
 ['There Is Still Time','secret','The watcher left you a letter, though she never knew your name.']
 ]}
];
export const LORE={hub:'Hollowmere was a refuge once. Five keepers tended five beacons, so no traveler would mistake the dark for the end of the road. The beacons went out. The road remained. And now, you have arrived.',ending:'You did not defeat the dark. You gave it somewhere to end. In the garden, a seed opens. Across the water, a bell answers. In the archive, someone’s name is remembered. The doors of Hollowmere stand open again. And at the threshold, you leave a lantern for whoever comes next.'};
export const WEIGHT_LAYOUTS={
 w1:['#########','#..o.o..#','#.......#','#..$.$..#','#.......#','#.......#','####.####'],
 w2:['#########','#o.....o#','#..#....#','#.$..$..#','#.......#','#.......#','####.####'],
 w3:['#########','#..oo...#','#.......#','#.$.#...#','#...$...#','#.......#','####.####'],
 w4:['#########','#o.....o#','#...#...#','#.$...$.#','#...#...#','#.......#','####.####'],
 w5:['#########','#..ooo..#','#.......#','#.$.$.$.#','#.......#','#.......#','####.####'],
 w6:['#########','#o..#..o#','#.......#','#..$$...#','#....$o.#','#.......#','####.####']
};
export const SEQUENCES={fire1:[1,2,3,0],fire2:[3,1,2,0],fire3:[3,0,1,2],fire4:[3,2,0,1],fire5:[2,1,0,3],runes1:[0,1,2,3],runes2:[3,0,1,2],runes3:[1,3,0,2]};
export const VALVES={valve1:[2,4,1],valve2:[1,2,3],valve3:[4,1,3]};
export const ECHOES={echo1:[0,0,0],echo2:[1,0,1,1,0],echo3:[0,1,0,0,1],echo4:[0,0,1,0,1]};
export const MIRRORS={
 mirror1:{source:[3,8,1,0],mirrors:[[8,8,0],[8,4,1]],target:[13,4]},
 mirror2:{source:[3,9,1,0],mirrors:[[12,9,1],[12,4,0],[6,4,1]],target:[6,8]},
 mirror3:{source:[3,9,1,0],mirrors:[[12,9,1],[12,3,1],[5,3,0],[5,6,0]],target:[10,6]},
 mirror4:{source:[3,3,1,0],mirrors:[[12,3,0],[12,9,1],[5,9,1],[5,6,1]],target:[9,6]}
};
const coords=[[0,2],[0,1],[0,0],[1,0],[1,1],[2,1],[2,0],[3,0],[1,2]];
export const ROOMS={hub:{id:'hub',name:'The Last Watch',type:'hub',zone:-1,index:0,clue:'A lantern does not ask how long the dark has lasted. Start with the northern arch, where the garden still grows.',coord:[0,0]},hearth:{id:'hearth',name:'The Open Door',type:'ending',zone:5,index:0,clue:'Carry the light to the hearth. Then leave it for the next traveler.',coord:[0,0]}};
ZONES.forEach((z,zi)=>z.rooms.forEach((r,i)=>{const id=`${z.id}-${i}`;ROOMS[id]={id,name:r[0],type:r[1],clue:r[2],variant:r[3],zone:zi,index:i,coord:coords[i]}}));
export const DOOR_POS={N:[8,1],E:[15,6],S:[8,11],W:[1,6]},DIRS={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]},OPPOSITE={N:'S',S:'N',E:'W',W:'E'};
export function exitsFor(id){const r=ROOMS[id];if(r.type==='hub')return[{dir:'N',to:'grove-0',need:0},{dir:'E',to:'tides-0',need:1},{dir:'S',to:'archive-0',need:2},{dir:'W',to:'forge-0',need:3}];if(r.type==='ending')return[{dir:'S',to:'hub',free:true}];const z=ZONES[r.zone];const result=[];if(r.index===0)result.push({dir:'S',to:'hub',free:true});const edges=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8]];for(const [a,b] of edges){if(r.index!==a&&r.index!==b)continue;const j=r.index===a?b:a;const [x,y]=coords[r.index],[xx,yy]=coords[j];const dir=xx>x?'E':xx<x?'W':yy>y?'S':'N';result.push({dir,to:`${z.id}-${j}`,free:j<r.index||j===8,forward:j>r.index&&j!==8});}return result;}
