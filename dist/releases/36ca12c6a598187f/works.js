// Independent discoveries converge on the ferry's flood gate. No timers or expiring states.
export const worksDefaults=()=>({diverter:0,grateClear:false,rootsClear:false,ornament:0,archiveOpen:false,song:[],tideGate:false,tideLit:false});
export const balanced=s=>{const p=s.positions['W3:ballast']||{x:5,y:7};return p.x===9&&p.y===7;};
export const flowing=s=>s.world.works.grateClear&&s.world.works.rootsClear&&s.world.works.diverter===2&&s.world.damper;
const orientations=['wrist','thumb','smallest finger','palm'];
export function describeWorks(g,o){const w=g.state.world.works;switch(o.type){
 case'ornament':return 'The iron ornament turns on a pin. Its narrow shadow points toward the '+orientations[w.ornament]+'.'+(g.state.world.lanternAt==='A1:reader-stand'?(w.ornament===2?' The shadow joins a seam in the stone.':' The shadow misses the fine seam.'):' Without a light to one side, the edges merge.');
 case'relief':return w.archiveOpen?'A shallow pocket stands open behind the carved hand.':g.state.world.lanternAt==='A1:reader-stand'?(w.ornament===2?'Side light joins the ornament’s shadow to the smallest finger. A hairline seam runs around it.':'Side light reveals a fine seam following the smallest finger. The iron shadow falls elsewhere.'):'A carved hand lies flat against the stone. In the even light, its edge is hard to distinguish.';
 case'diverter':return 'The spindle points to the '+['leaf','wash-bowl','bell'][w.diverter]+'. '+(w.grateClear&&w.rootsClear?'Water takes that branch.':'The channel underneath is still.');
 case'grate':return w.grateClear?'The sailcloth lies on the coping. The trash rack is clear.':'A sailcloth bundle catches on the sunken rack. Its hauling ring lies beyond a hand’s reach.';
 case'rootmat':return w.rootsClear?'The dark fibres have been cut from the intake. Pale living roots arch untouched above it.':o.text;
 case'intake-mark':return w.rootsClear?'Water passes beneath the pale roots into a stone throat.':'A shallow pool stands against the dark root mat. Beyond it, the watercourse is dry.';
 case'flow-mark':return flowing(g.state)?'A low current passes into the bell branch. The washing return is quiet.':w.rootsClear&&w.grateClear?(g.state.world.damper?'The return pipe is shut. Water takes the '+['garden','washing','bell'][w.diverter]+' branch.':'The washing return draws water away with a hollow gurgle.'):'The water is arrested somewhere above this gallery.';
 case'lift':return g.has('hook')?'The empty cradle rests against the coping.':balanced(g.state)?'The cable hangs balanced. The brake can be lifted with one hand.':'The cable pulls hard against the brake. The laden cradle remains below the coping.';
 case'weighbed':return balanced(g.state)?'The trolley settles onto the bearing. Its load takes the strain from the southern chain.':o.text;
 case'balance-mark':return balanced(g.state)?'Both chains hang evenly. Somewhere below, the cradle rises.':'One chain is taut; its companion hangs loose. Wheel tracks lead east across the floor to a recessed bearing.';
 case'mouth':return flowing(g.state)?['Water breathes beneath the low bronze mouth.','Water breathes beneath the middle bronze mouth.','Water breathes beneath the high bronze mouth.'][o.index]+' A thin tongue trembles inside.':'The bronze mouth is dry. Tapping it makes only a dull knock.';
 case'well':return w.tideGate?'The gate chains have caught on their upper pawls. They will not fall when the current stops.':flowing(g.state)?'Water turns a drum below the mouths. Three pawls wait against its toothed rim.':'The drum rests in its dry cradle. Silt fills the mouths of the feeder pipes.';
 case'tideglass':return g.has('tideglass')?'A clean circle remains where the vigil glass stood.':o.text;
 case'damper':return g.state.world.damper?'The sleeve closes the washing return. Beneath the floor, the returning pipe falls quiet.':w.rootsClear&&w.grateClear?'Water gurgles through the open washing return.':'The washing return stands open. Its bronze sleeve is cold.';
 default:return null;
}}
function award(g,id,text){if(g.has(id))return;g.state.relics.push(id);g.state.equipped=id;g.emit('relic',text,{relic:id});}
export function interactWorks(g,o){const w=g.state.world.works;switch(o.type){
 case'ornament':g.checkpoint();w.ornament=(w.ornament+1)%4;g.emit('click',g.state.world.lanternAt==='A1:reader-stand'&&w.ornament===2?'Shadow and seam meet.':'The iron turns on its pin.');return true;
 case'relief':
  if(w.archiveOpen){g.inspect(o);return true;}
  if(g.state.world.lanternAt==='A1:reader-stand'&&w.ornament===2){g.checkpoint();w.archiveOpen=true;award(g,'bell','The smallest finger yields. Behind it, the guest’s bell is wrapped in a faded cloth.');}
  else g.say('The carved hand is cold. Nothing yields beneath your fingers.');return true;
 case'diverter':g.checkpoint();w.diverter=(w.diverter+1)%3;w.song=[];g.emit('click',describeWorks(g,o));return true;
 case'lift':
  if(g.has('hook')){g.inspect(o);return true;}
  if(balanced(g.state)){g.checkpoint();award(g,'hook','The brake lifts. You draw the cradle to the coping and take the ferryman’s hook.');}
  else g.say('The brake will not lift against the strain. The chain shivers into the northern wall.');return true;
 case'tideglass':if(!g.has('tideglass')){g.checkpoint();award(g,'tideglass','You lift the vigil glass. The little flame leans toward the old monastery.');}else g.inspect(o);return true;
 case'grate':case'rootmat':case'mouth':return useWorks(g,g.state.equipped,o);
 default:return false;
}}
export function useWorks(g,id,o){const w=g.state.world.works;
 if(id==='blade'&&o?.type==='rootmat'){
  if(w.rootsClear){g.inspect(o);return true;}g.checkpoint();w.rootsClear=true;g.emit('cut','The fibres part. Water rushes into the channel.',{x:o.x,y:o.y});return true;
 }
 if(id==='hook'&&o?.type==='grate'){
  if(w.grateClear){g.inspect(o);return true;}g.checkpoint();w.grateClear=true;g.emit('hook','Wet sailcloth slides onto the coping. Water passes the rack.',{from:{x:g.state.x,y:g.state.y},to:{x:o.x,y:o.y}});return true;
 }
 if(id==='hook'&&o?.movable){
  const dx=Math.sign(g.state.x-o.x),dy=Math.sign(g.state.y-o.y);
  if(Math.abs(dx)+Math.abs(dy)!==1){g.say('The ring lies at an awkward angle.');return true;}
  // Step back while drawing the ringed object into the vacated space.
  if(g.passable(g.state.x+dx,g.state.y+dy)&&g.tile(g.state.x+dx,g.state.y+dy)!=='D'&&g.canPush(o,dx,dy)){
   g.checkpoint();g.state.positions[g.state.room+':'+o.id]={x:o.x+dx,y:o.y+dy};g.state.x+=dx;g.state.y+=dy;g.state.steps++;g.say('You step back and draw the iron ring toward you.');
  }else g.say('There is no room to draw it back.');return true;
 }
 if(id==='bell'&&o?.type==='mouth'){
  if(w.tideGate){g.say('The well answers. Above it, the gate chains rest on their catches.');return true;}
  if(!flowing(g.state)){g.say('Your bell rings clearly. The dry mouth answers with a lifeless rattle.');return true;}
  g.checkpoint();g.emit('note','',{pitch:[220,330,440][o.index]});const answer=[0,2,1];w.song.push(o.index);
  if(w.song.some((n,i)=>answer[i]!==n)){w.song=[];g.emit('click','The well answers out of turn. The drum slips back and its pawls fall loose.');}
  else if(w.song.length===3){w.tideGate=true;g.emit('reveal','Three voices answer across the water. Chains climb inside the walls; somewhere above, two flood gates lift and catch.');}
  else g.emit('click',['A low note turns the water drum. A pawl holds.','The high mouth answers. Another tooth catches.'][w.song.length-1]);return true;
 }
 if(id==='tideglass'&&g.state.room==='H'&&o?.id==='window-0'){
  if(w.tideLit){g.say('The ferryman’s window keeps its blue vigil.');return true;}
  g.checkpoint();w.tideLit=true;g.emit('reveal','The five-sided foot settles into the niche. Blue light fills the ferryman’s window. One keeper has found his way home.');return true;
 }
 if(['hook','bell','tideglass'].includes(id)){g.say(id==='bell'?'The clear note fades through the room.':id==='hook'?'The bill finds no ring it can draw.':'The little flame waits behind its glass.');return true;}
 return false;
}
export function validWorks(s){const w=s.world.works;if(s.expansion!==1||!w||['grateClear','rootsClear','archiveOpen','tideGate','tideLit'].some(k=>typeof w[k]!=='boolean')||![0,1,2].includes(w.diverter)||![0,1,2,3].includes(w.ornament)||!Array.isArray(w.song)||w.song.length>3||w.song.some((n,i)=>n!==[0,2,1][i]))return false;
 if(s.relics.includes('bell')!==w.archiveOpen||w.rootsClear&&!s.relics.includes('blade')||w.grateClear&&!s.relics.includes('hook')||w.tideGate&&(!s.relics.includes('bell')||!w.grateClear||!w.rootsClear)||s.relics.includes('tideglass')&&!w.tideGate||w.tideLit&&!s.relics.includes('tideglass')||s.room==='W6'&&!w.tideGate)return false;return true;}
