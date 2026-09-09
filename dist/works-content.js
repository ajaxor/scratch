const o=(id,type,x,y,name,text,extra={})=>({id,type,x,y,name,text,...extra});
const prop=(id,x,y,name,text,furnishing=8,extra={})=>o(id,'prop',x,y,name,text,{furnishing,...extra});
const note=(id,x,y,name,text)=>o(id,'inscription',x,y,name,text);
export const WORKS_ROOMS={
 W1:{id:'W1',name:'The Sluice Gallery',zone:1,index:7,coord:[2,2],arrival:'A high walkway follows a black channel. One brass pipe climbs toward the laundry; another disappears under the bell well.',objects:[
  o('diverter','diverter',5,3,'A three-way headgate','',{propSprite:6}),
  o('grate','grate',11,7,'A sunken trash rack','A sailcloth bundle catches on the rack. Its iron hauling ring lies just beyond the coping.',{archArt:15}),
  note('pipe-plan',4,8,'A worn casting','A leaf, a wash-bowl, and a bell are cast around the spindle. Each pipe leaves beneath its own mark.'),
  prop('boat-boots',3,4,'A pair of boots','Two sizes, both repaired with the same sailcloth.',10),
  prop('oiler',13,3,'The oiler’s stool','The worn seat faces the headgate. Drops of oil have outlasted the person who left them.'),
  o('current','flow-mark',8,4,'The branching current','',{floor:true}),
  note('gallery-warning',11,2,'Letters above the culvert','What the house spends, the well cannot sing.'),
  prop('float',14,9,'A cork float','A knotted line hangs from the float. The lowest knot is polished nearly smooth.',12)
 ]},
 W2:{id:'W2',name:'The Bell Well',zone:1,index:8,coord:[3,2],arrival:'Three bronze mouths overlook a circular well. A little cargo cradle hangs inside its northern wall, beyond reach.',objects:[
  o('lift','lift',4,3,'A suspended tool cradle','A long hook lies in the cradle. Its cable passes through the wall above a pulley. The brake handle is within reach.',{furnishing:14}),
  ...[0,1,2].map((i)=>o('mouth-'+i,'mouth',7+i*3,3,['The low mouth','The middle mouth','The high mouth'][i],'',{propSprite:0,index:i})),
  o('well','well',8,9,'The water drum','',{floor:true}),
  note('well-verse',3,9,'A verse on the coping','The traveller calls. The drowned house answers in its own voice.'),
  prop('boat-model',13,8,'A child’s boat','Its cabin has one window for each member of a family. The smallest has been painted twice.',10),
  o('well-stand','stand',3,8,'A dry ledge','A candle scar lies above the highest waterline.',{furnishing:8})
 ]},
 W3:{id:'W3',name:'The Counterweight House',zone:1,index:9,coord:[3,1],arrival:'Two lift shafts divide the tall room. On the service floor a wheeled iron ballast stands beside a recessed weighing bed.',objects:[
  o('ballast','prop',5,7,'An iron ballast trolley','Its wheels run east and west along a scoring in the stone. A socket underneath fits the bearing at the far end.',{propSprite:2,movable:true}),
  o('weighbed','weighbed',9,7,'A recessed weighing bed','A worn bearing lies at the intersection of the wheel tracks. A chain rises from it through the southern wall.',{floor:true,propSprite:3}),
  note('loads',3,3,'A tally of loads','Cradle: one empty boat. Passenger: one iron boat. Do not count the river.'),
  prop('spare-chain',12,7,'A coiled chain','The first links are bright. The remainder has rusted to the floor.',13),
  prop('keeper-coat',3,10,'A ferryman’s coat','The shoulders have been patched where the lifting yoke rested.',15),
  o('balance','balance-mark',8,4,'The travelling chain','',{floor:true}),
  note('counterweight-names',12,3,'Small names in the plaster','Someone measured children here, taller each winter. The final marks are all on the same day.')
 ]},
 W4:{id:'W4',name:'The Silt Archive',zone:2,index:10,coord:[2,1],arrival:'Raised shelves stand above an old flood. A narrow dry aisle bends between the ferry records and the wall of the laundry.',objects:[
  prop('ferry-book',4,5,'The book of crossings','A departing boat. A bridge in flood. A boat at its mooring. Three little drawings repeat beside every safe crossing. On the final page each has been pressed hard enough to tear the paper. Beneath them: “Three answers. No one left behind.”',9),
  prop('rubbing',11,3,'A charcoal rubbing','A hand from the borrowers’ stone, with a shadow laid over it. The margin reads: “Not the wrist. Not the thumb. The smallest finger keeps the guest’s voice.”',9),
  note('flood-account',12,9,'An account of the flood','We shut the washing return before sounding the well. Soap on the bronze made the voices catch.'),
  prop('dry-books',4,9,'Books on bricks','Recipes occupy the highest shelf. The abbots are below the floodline.',9),
  o('archive-stand','stand',8,8,'The copyist’s stand','A little slate has been polished by the edge of an elbow.',{furnishing:8}),
  prop('cracked-cup',8,3,'A cracked cup','Ink fills the crack. Someone kept drinking from it.',10),
  o('archive-scrape','mark',3,3,'Cart scrapes','Grooves continue into the laundry’s drying recess. Books and clean linen once travelled the same route.',{floor:true})
 ]},
 W5:{id:'W5',name:'The Intake Garden',zone:0,index:11,coord:[2,0],arrival:'The roof has fallen around a collecting basin. Roots have knitted a dark mat across the mouth of the watercourse.',objects:[
  o('rootmat','rootmat',9,5,'A fibrous root mat','Fine dark fibres choke the intake. Pale living roots pass above it without entering the water.',{furnishing:6}),
  prop('graft',4,2,'An old graft','One pale root has been bound to a new stock. The gardener left the surrounding dark shoots severed.',6),
  note('garden-rule',12,3,'Words on a stone lip','Keep the living above the flood. Take the dead from its mouth.'),
  o('intake','intake-mark',6,7,'The collecting basin','',{floor:true}),
  prop('garden-bench',3,9,'A sheltered seat','From here the ferryman could watch the smoke from the laundry.'),
  prop('lunch',13,8,'A lunch bowl','An apple pip has split the wooden bowl.',10)
 ]},
 W6:{id:'W6',name:'The Ferryman’s Vigil',zone:1,index:12,coord:[3,0],arrival:'The gates stand above the highest flood. Beyond them, a small blue light keeps watch over an empty landing.',objects:[
  o('tideglass','tideglass',8,3,'A blue vigil glass','A blue flame sleeps inside thick river glass. Its five-sided foot is worn smooth.',{propSprite:9}),
  prop('last-book',5,7,'The ferryman’s last page','“Five windows for those who kept the house. Leave mine burning if I am late. I will not leave the last passenger on the bank.”',9),
  prop('empty-chair',11,7,'A chair facing the river','The cushion has been turned so the dry side faces upward.',11),
  note('last-passenger',8,9,'A name on the threshold','No name was written here. Only a tally: one more.'),
  o('vigil-stand','stand',5,3,'A stone bedside shelf','A ring of soot marks where an ordinary lamp stood.',{furnishing:8})
 ]}
};
export const WORKS_RELICS={
 hook:{name:'Tidehook',short:'Hook',sprite:10,description:'A long boat hook with a folding iron bill. Made to bring a ring within reach.'},
 bell:{name:'Echo Bell',short:'Bell',sprite:13,propSprite:0,description:'The small bell once kept for the guest. Its clear note lingers in hollow bronze.'},
 tideglass:{name:'Tideglass',short:'Tideglass',sprite:13,description:'A blue vigil flame sealed behind thick glass. A five-sided foot fits an older house.'}
};
