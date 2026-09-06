export const W=17,H=13;
export const CAMPAIGN='absent-opening';
export const RELICS={
 lantern:{name:'Lantern',short:'Lantern',sprite:8,description:'A small, stubborn light. It fits comfortably in the hand, or on a reading stand.'},
 blade:{name:'Thornblade',short:'Blade',sprite:9,description:'A narrow blade, worn smooth where a gardener rested her thumb. The edge still holds.'}
};
export const ZONES=[
 {id:'grove',name:'The Overgrown Cloister',color:'#86b89a',tint:'#183c2a'},
 {id:'tides',name:'The Sunken Cistern',color:'#73c6d2',tint:'#113b48'},
 {id:'archive',name:'The Moonlit Archive',color:'#b4a5d5',tint:'#302c4c'}
];
export const DOOR_POS={N:[8,1],E:[15,6],S:[8,11],W:[1,6]};
export const DIRS={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};
export const OPPOSITE={N:'S',S:'N',E:'W',W:'E'};
const object=(id,type,x,y,name,text,extra={})=>({id,type,x,y,name,text,...extra});
const decor=(id,sprite,x,y,name,text,extra={})=>object(id,'prop',x,y,name,text,{furnishing:sprite,...extra});
const inscription=(id,x,y,name,text)=>object(id,'inscription',x,y,name,text);
export const ROOMS={
 H:{id:'H',name:'The Last Watch',zone:-1,index:0,coord:[0,2],arrival:'Rain whispers somewhere beyond the walls. Three passages breathe different air.',objects:[
  decor('chair',11,8,5,'The guest chair','The seat is polished by use. Five dark niches face it. There is room for someone to sit.'),
  object('guest-stand','stand',7,5,'A reading stand','A little shelf beside the empty chair.',{furnishing:8}),
  decor('bowl',10,10,5,'A mended bowl','Three copper staples hold the wood together. The bowl is dry; a thin pipe ends above its rim.'),
  inscription('guest-words',5,3,'Words above the hearth','Five kept the house. None took the stranger’s place.'),
  decor('guest-pipe',13,11,3,'A bronze pipe','A narrow branch runs west, disappearing into the old masonry.'),
  ...[4,6,8,10,12].map((x,i)=>object('window-'+i,'niche',x,3,'An empty niche','Cold glass. Whatever once shone here has gone dark.')),
  decor('bench',8,4,8,'A waiting bench','Someone has repaired the same leg twice.'),
  decor('linen',7,12,8,'Folded linen','Dry cloth, laid out for travelers who never arrived.')
 ],walls:[[4,4],[12,4],[4,9],[12,9]]},
 C1:{id:'C1',name:'The Rain Porch',zone:0,index:1,coord:[0,1],arrival:'Rain ticks against broken pottery. Footsteps have worn two paths through the moss.',objects:[
  decor('cart',14,5,5,'A handcart','A tarnished ring is bolted to the cart. Small wheels sit in shallow ruts.',{movable:true}),
  decor('sail',12,11,3,'A rolled awning','Rain has stained the underside. The cloth is still sound.'),
  decor('porch-pot',6,4,8,'A cracked planter','Rainwater escapes through a crack rather than its blocked drain.'),
  decor('porch-bench',8,11,8,'A porch bench','The dry patch underneath is shaped like a sleeping dog.'),
  inscription('porch-stone',5,3,'A weathered lintel','The house remembers the weight of a hand.'),
  object('waterline','mark',12,5,'A tide mark','A line of silt passes behind the plaster. It continues toward the cistern.',{floor:true})
 ],walls:[[3,4],[3,5],[3,6],[3,7],[13,7],[13,8]]},
 C2:{id:'C2',name:'The Widow’s Beds',zone:0,index:2,coord:[0,0],arrival:'Leaves crowd the old beds. A wooden shaft runs along the eastern wall.',objects:[
  decor('healthy',6,5,4,'A pale-leaved plant','A pale root curls into a bowl half full of water. The leaves are bright; the collar lies beneath a little canopy.'),
  decor('dry',6,11,8,'A different plant','Small dark leaves flourish in dry soil. Its straight roots do not resemble the pale plant’s.'),
  object('shade-wheel','shade',11,3,'A wooden wheel','A square shaft runs from the wheel, through a repaired frame, and onward into the eastern wall.',{furnishing:4}),
  decor('frame',4,12,3,'A repaired frame','The wood bears curved scrape marks beside its brass lip. Fine sawdust lies beneath it.'),
  inscription('garden-words',4,7,'An old garden stone','What crowns the leaf must never crown the buried.'),
  decor('mara-ledger',9,5,8,'The planting ledger','Mara’s hand fills the margins: “Three staples for the bowl. It will last another winter.” A later line reads: “The ferryman may keep it. He feeds more mouths than I.”'),
  object('garden-stand','stand',8,4,'A low shelf','A dry shelf built into the planting bed.',{furnishing:8}),
  object('shaft','mark',13,4,'The shutter shaft','A square timber passes through the east wall. Its joints are polished from years of turning.',{floor:true})
 ],walls:[[4,4],[4,5],[5,5],[6,5],[10,7],[11,7],[12,7]]},
 C3:{id:'C3',name:'The Gardener’s Rest',zone:0,index:3,coord:[1,0],arrival:'Dust hangs in the window. Two cords descend beside a glazed cabinet.',objects:[
  object('cabinet','cabinet',8,4,'A glazed cabinet','A slender blade rests behind cloudy glass.',{furnishing:0}),
  object('left-cord','cord',5,4,'A knotted cord','The cord passes over a brass pulley into the cabinet’s left catch.',{furnishing:3,index:0}),
  object('right-cord','cord',11,4,'A braided cord','The cord passes over a brass pulley into the cabinet’s right catch.',{furnishing:3,index:1}),
  object('shutter','shutter',12,2,'Wooden shutters','A square shaft enters from the western wall. The shutters have no handle on this side.',{furnishing:5}),
  decor('rest-stool',8,4,8,'A low stool','The seat faces the cabinet. The floor underneath is scored by years of boots.'),
  decor('rest-pot',6,12,8,'An untended pot','The soil has hardened around a broken label.'),
  inscription('cabinet-words',8,8,'A line on the worktable','Two hands hold what the day will not release.'),
  object('rest-stand','stand',7,6,'The worktable','A clear patch remains among the dust.',{furnishing:8})
 ],walls:[[3,3],[3,4],[3,5],[13,4],[13,5],[13,6]]},
 C4:{id:'C4',name:'The Laundry Court',zone:0,index:4,coord:[1,1],arrival:'Pale linen hangs without a breeze. Behind it, copper collars interrupt an old pipe.',objects:[
  decor('linen-one',7,4,3,'Hanging linen','One sheet has been darned with blue thread. The stitches form no pattern.'),
  decor('linen-two',15,6,8,'A faded curtain','Soap has bleached the lower hem.'),
  object('binding','binding',11,6,'A bound trellis','Living shoots twist through the slats. Beyond them, the stone floor continues.',{furnishing:7}),
  decor('pipe',13,9,3,'A patched pipe','Two copper collars join a newer elbow to an older tube. The tube continues beneath the courtyard.'),
  object('damper','damper',9,4,'A pipe sleeve','The sleeve turns between two worn stops. No vibration reaches it.',{furnishing:13}),
  decor('cloth-bench',8,4,8,'A washing bench','A few pins remain in a shallow dish.'),
  decor('seed-note',9,13,4,'A folded page','“I planted the trees far apart, so there would be room for everyone to come back.” Beneath it, a pressed leaf has kept its color.',{discovery:'garden-letter'}),
  object('root-boundary','boundary',14,8,'The root stair','The stair descends between pale roots.',{furnishing:15}),
  object('foundry-boundary','boundary',4,10,'A service passage','Warm brick gives way to darkness beyond the laundry.',{furnishing:15})
 ],walls:[[11,2],[11,3],[11,4],[11,5],[11,7],[11,8],[11,9],[11,10]]},
 T1:{id:'T1',name:'The Broken Quay',zone:1,index:5,coord:[1,2],arrival:'Water moves below a dry ledge. Three old tide lines stripe the stone.',water:[[9,3,13,5],[10,7,13,9]],objects:[
  decor('quay-sail',12,5,3,'A patched sail','The same blue thread has been used here and in the laundry.'),
  decor('quay-cart',14,5,8,'A cargo trolley','A wheeled frame with a fixed ring on its handle. Silt has dried around its wheels.'),
  object('tide-marks','mark',8,4,'Three tide lines','Low, middle, and high water have each left a different stain.',{floor:true}),
  object('cistern-boundary','boundary',14,6,'The far landing','A dry ledge continues around the water.',{furnishing:15}),
  inscription('fare',7,8,'A ferry notice','One coin each. No one left behind.')
 ],walls:[[3,3],[3,4]]},
 A1:{id:'A1',name:'The Borrowers’ Hall',zone:2,index:6,coord:[-1,2],arrival:'The air smells of paper and cold stone. Someone left a place at the reading table.',objects:[
  decor('book-cart',14,4,4,'A book cart','Ordinary names cover the spines. The kings occupy only one shelf.'),
  decor('borrowers-ledger',9,6,8,'A household inventory','Six places laid. Five windows cleaned. The guest’s bell wrapped for the night.'),
  object('reader-stand','stand',8,5,'A reading stand','A small lip keeps a lamp from sliding off the table.',{furnishing:8}),
  object('relief','relief',9,5,'An iron ornament','A hand is carved into the wall behind the ornament.',{furnishing:13}),
  decor('archive-chair',11,7,7,'An empty chair','The arms have been polished smooth.'),
  object('archive-boundary','boundary',8,2,'The inner gallery','Shelves recede into an unlit gallery.',{furnishing:15}),
  inscription('names',12,8,'A note in the margin','They gave us taller names, and smaller lives.')
 ],walls:[[3,3],[3,4],[3,5],[4,3],[5,3],[11,3],[12,3],[13,3],[13,4]]}
};
const links=[['H','N','C1'],['H','E','T1'],['H','W','A1'],['C1','N','C2'],['C1','E','C4'],['C2','E','C3'],['C3','S','C4']];
export function exitsFor(id){return links.flatMap(([a,dir,b])=>a===id?[{dir,to:b}]:b===id?[{dir:OPPOSITE[dir],to:a}]:[]);}
export const OBJECTS=Object.fromEntries(Object.values(ROOMS).flatMap(r=>r.objects.map(o=>[r.id+':'+o.id,{...o,room:r.id}])));
