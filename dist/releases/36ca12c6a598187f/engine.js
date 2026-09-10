import{toolDefaults}from'./tool-content.js';
import{lightMap,clearLine}from'./lighting.js';
import{isCut,visibleObject,rangeFor,toolFor,playDescription,interactPlay,usePlay,validToolState}from'./tool-play.js';
import{worksDefaults,flowing,describeWorks,interactWorks,useWorks,validWorks}from'./works.js';
import{groundAt,WALKABLE,SPAWNS}from'./architecture.js';
import{W,H,CAMPAIGN,ROOMS,OBJECTS,RELICS,LAYOUT_REVISION,DIRS,exitsFor}from'./content.js';
const clone=x=>JSON.parse(JSON.stringify(x));
export const distance=(a,b)=>Math.max(0,a.x-b.x-(b.w||1)+1,b.x-a.x-(a.w||1)+1)+Math.max(0,a.y-b.y-(b.h||1)+1,b.y-a.y-(a.h||1)+1);
const cells=o=>Array.from({length:(o.w||1)*(o.h||1)},(_,i)=>[o.x+i%(o.w||1),o.y+Math.floor(i/(o.w||1))]);
export class Game{
 constructor(saved=null){if(saved)saved=migrateSave(saved);if(saved&&!validSave(saved))throw Error('This save is not a valid opening-chapter journey.');this.state=saved?clone(saved):{version:2,expansion:1,toolRevision:1,layoutRevision:LAYOUT_REVISION,campaign:CAMPAIGN,room:'H',x:8,y:9,face:[0,-1],relics:[],equipped:null,visited:['H'],connections:[],observations:[],notes:'',seconds:0,steps:0,world:{tools:toolDefaults(),works:worksDefaults(),shadeClosed:false,cords:[false,false],cabinetOpen:false,trellisCut:false,damper:false,lanternAt:null},positions:{},discoveries:[]};this.events=[];this.history=[];}
 get room(){return ROOMS[this.state.room];}
 get data(){return{objects:this.room.objects.map(o=>({...o,...this.state.positions[this.state.room+':'+o.id]}))};}
 snapshot(){return clone(this.state);}
 has(id){return this.state.relics.includes(id);}
 emit(type,text,extra={}){this.events.push({type,text,...extra});}
 say(text){this.emit('message',text);}
 checkpoint(snapshot=this.snapshot()){this.history.push(snapshot);if(this.history.length>160)this.history.shift();}
 undo(){if(!this.history.length)return;const old=this.state.room;const notes=this.state.notes;this.state=this.history.pop();this.state.notes=notes;this.events=[];this.say('A moment, returned.');if(old!==this.state.room)this.emit('arrive',this.room.name);}
 equip(id){if(!this.has(id))return;this.state.equipped=id;}
 tile(x,y){return groundAt(this.state.room,x,y);}
 objectsAt(x,y){return this.data.objects.filter(o=>cells(o).some(([a,b])=>a===x&&b===y));}
 isLit(x,y){return lightMap(this)[y]?.[x]===true;}
 visible(o){return visibleObject(this,o);}
 actionRange(o){return rangeFor(this,o);}
 solid(o){if(['bramble','ivy-window','parcel'].includes(o.type)&&isCut(this,o))return false;return !o.floor&&!(o.type==='binding'&&this.state.world.trellisCut);}
 passable(x,y){const e=exitsFor(this.state.room).find(e=>e.at[0]===x&&e.at[1]===y);if(e&&!this.allowedExit(e))return false;return WALKABLE.has(this.tile(x,y))&&!this.objectsAt(x,y).some(o=>this.solid(o));}
 allowedExit(e){if([this.state.room,e.to].sort().join(':')==='C4:W4'&&!this.state.world.trellisCut)return false;return ![this.state.room,e.to].includes('W6')||this.state.world.works.tideGate;}
 landing(x,y,room=this.state.room){return exitsFor(room).some(e=>e.landing[0]===x&&e.landing[1]===y);}
 canPush(o,dx,dy){if(o.id==='ballast'&&(o.y+dy!==7||o.x+dx<4||o.x+dx>10))return false;return cells({...o,x:o.x+dx,y:o.y+dy}).every(([x,y])=>WALKABLE.has(this.tile(x,y))&&this.tile(x,y)!=='D'&&!this.landing(x,y)&&!this.objectsAt(x,y).some(p=>p.id!==o.id&&this.solid(p)));}
 move(dx,dy){if(Math.abs(dx)+Math.abs(dy)!==1)return false;const s=this.state,previous=this.snapshot();s.face=[dx,dy];const x=s.x+dx,y=s.y+dy;
  if(this.tile(x,y)==='D'){const e=exitsFor(s.room).find(e=>e.at[0]===x&&e.at[1]===y);if(!this.allowedExit(e)){this.say([s.room,e.to].includes('W6')?'A flood gate fills the passage. Three pawls bear on its lifting chain.':'Living shoots from the laundry trellis press the service wicket shut.');return false;}this.checkpoint(previous);s.steps++;this.enter(e.to,s.room);return true;}
  if(!WALKABLE.has(this.tile(x,y)))return false;
  const o=this.objectsAt(x,y).find(o=>this.solid(o));
  if(o){if(o.movable&&this.canPush(o,dx,dy)){this.checkpoint(previous);s.positions[s.room+':'+o.id]={x:o.x+dx,y:o.y+dy};s.x=x;s.y=y;s.steps++;this.say('The wheels scrape across the stone.');return true;}this.say(this.describe(o));return false;}
  this.checkpoint(previous);s.x=x;s.y=y;s.steps++;return true;
 }
 enter(id,from=this.state.room){const back=exitsFor(id).find(e=>e.to===from);if(!back)throw Error('Rooms are not connected.');const [x,y]=back.landing,[dx,dy]=DIRS[back.dir];const edge=[from,id].sort().join(':');this.state.room=id;this.state.x=x;this.state.y=y;this.state.face=[-dx,-dy];if(!this.state.visited.includes(id))this.state.visited.push(id);if(!this.state.connections.includes(edge))this.state.connections.push(edge);this.emit('arrive',this.room.name);this.say(this.room.arrival);}
 nearest(){const s=this.state,front={x:s.x+s.face[0],y:s.y+s.face[1]};return this.data.objects.filter(o=>this.visible(o)&&distance(s,o)<=1).sort((a,b)=>distance(a,front)-distance(b,front))[0];}
 describe(o){if(!this.isLit(o.x,o.y)&&!['lamp','lantern-pickup','anchor','bramble','ivy-window','parcel','rootmat','binding'].includes(o.type))return 'You can make out the shape, but not its details in the dark.';const play=playDescription(this,o);if(play!==null)return play;const extra=describeWorks(this,o);if(extra!==null)return extra;const w=this.state.world;switch(o.type){
 case'cord':return w.cords[o.index]?'The weight hangs high. Its catch is lifted.':'The weight rests low. Its cord is slack.';
 case'shade':return w.shadeClosed?'The wheel holds the shutters closed. An offset brass pin rests at the far end of its travel.':'The wheel holds the shutters open. An offset brass pin bears toward the workshop.';
 case'linkage':return w.shadeClosed?'The shaft’s eccentric has drawn a brass rod away from the cabinet. Its bowed retaining strip now lies flat.':'The shutter shaft turns an eccentric. A brass rod runs from it to a bowed retaining strip across the cabinet’s outer edge.';
 case'shutter':return w.shadeClosed?'The shutters are closed. Beside their shaft, a brass rod has withdrawn from the cabinet edge.':'The shutters are open. Their shaft carries an offset brass pin; a rod runs from that pin along the cabinet wall.';
 case'cabinet':return w.cabinetOpen?(this.has('blade')?'Dust outlines the blade that rested here.':'The glass door stands open. The gardener’s blade lies inside.'):(w.shadeClosed?'Cloudy glass hides a blade. Two brass catches hold the door. The outer retaining strip lies flat.':'Cloudy glass hides a blade. Two brass catches hold the door. A bowed retaining strip bears across the outer edge; a rod runs along the wall from it.');
 case'binding':return w.trellisCut?'The severed shoots lie beside the open trellis.':o.text;
 case'damper':return w.damper?'The sleeve covers the returning branch. The pipe remains still.':'The returning branch is open. The pipe remains still.';
 case'stand':return w.lanternAt===this.state.room+':'+o.id?'Your lantern rests on the stand.':o.text;
 case'relief':return w.lanternAt==='A1:reader-stand'?'Side light reveals a fine seam following the carved hand. The ornament’s shadow almost meets it.':'A carved hand lies flat against the stone. In the even light, its edge is hard to distinguish.';
 default:return o.text;
 }}
 inspect(o=this.nearest(),brief=false){if(!o||distance(o,this.state)>1){this.say('There is nothing within reach.');return;}if(!this.visible(o)){this.say('Nothing distinct shows here.');return;}if(!this.isLit(o.x,o.y)){this.say('Too dark to make out the details.');return;}const text=this.describe(o),key=this.state.room+':'+o.id;this.record(o,text,key);this.emit(brief?'message':'inspect',text,{title:o.name,boundary:o.type==='boundary'});}
 record(o,text,key=this.state.room+':'+o.id){const entry=this.state.observations.find(e=>e.key===key);if(entry){if(!entry.texts.includes(text))entry.texts.push(text);}else this.state.observations.push({key,room:this.state.room,title:o.name,texts:[text]});}
 interact(o=this.nearest()){if(o&&this.visible(o)&&toolFor(o)===this.state.equipped){this.use(this.state.equipped,o);return;}if(!o||distance(o,this.state)>1){this.say('There is nothing within reach.');return;}if(!this.visible(o)){this.say('Nothing distinct shows here.');return;}if(interactPlay(this,o))return;if(!this.isLit(o.x,o.y)&&['ornament','relief','cabinet','inscription'].includes(o.type)){this.say('Bring light closer.');return;}if(interactWorks(this,o))return;const w=this.state.world;
  if(o.type==='shade'){this.checkpoint();w.shadeClosed=!w.shadeClosed;this.emit('click',w.shadeClosed?'The wheel turns. The shutters close; a brass rod draws back beyond the eastern wall.':'The wheel turns. The shutters open; the eccentric presses its rod toward the cabinet.');return;}
  if(o.type==='cord'){this.checkpoint();w.cords[o.index]=!w.cords[o.index];this.emit('click',this.describe(o));return;}
  if(o.type==='cabinet'){
   if(w.cabinetOpen){if(!this.has('blade')){this.checkpoint();this.state.relics.push('blade');this.state.equipped='blade';this.emit('relic',RELICS.blade.description,{relic:'blade'});}else this.inspect(o);return;}
   if(w.cords.every(Boolean)&&w.shadeClosed){this.checkpoint();w.cabinetOpen=true;this.emit('reveal','The retaining strip lies clear. The glass door opens with a small sigh.');}
   else this.say(!w.cords.every(Boolean)?'Brass bears against the glass door. The frame does not move.':'Both brass catches lift clear. The bowed retaining strip still bears across the outer edge.');return;
  }
  if(o.type==='damper'){this.checkpoint();w.damper=!w.damper;w.works.song=[];this.emit('click',this.describe(o));return;}
  if(o.type==='stand'){this.placeLantern(o);return;}
  if(o.type==='binding'&&this.state.equipped==='blade'){this.use('blade',o);return;}
  this.inspect(o,true);
  if(o.discovery&&this.isLit(o.x,o.y)&&!this.state.discoveries.includes(o.discovery)){this.checkpoint();this.state.discoveries.push(o.discovery);this.emit('discovery','The pressed leaf is still green.');}
 }
 placeLantern(o){if(!this.has('lantern')){this.say('An empty lamp stand.');return;}const w=this.state.world,key=this.state.room+':'+o.id;if(w.lanternAt===key){this.checkpoint();w.lanternAt=null;this.state.equipped='lantern';this.say('You take the lantern.');return;}if(w.lanternAt){this.say('Your lantern is resting on a stand elsewhere.');return;}if(this.state.equipped!=='lantern'){this.inspect(o);return;}this.checkpoint();w.lanternAt=key;this.emit('reveal','You set the lantern on the stand. Shadows lean across the stone.');}
 use(id=this.state.equipped,o=this.nearest()){if(!this.has(id))return;if(o&&!this.visible(o)){this.say('Nothing distinct shows here.');return;}if(o&&(distance(o,this.state)>rangeFor(this,o,id)||!clearLine(this,this.state,o))){this.say('It is beyond reach.');return;}if(usePlay(this,id,o))return;if(useWorks(this,id,o))return;if(id==='lantern'){if(this.state.world.lanternAt){this.say('The lantern is resting on its stand.');return;}if(o?.type==='stand')return this.placeLantern(o);this.emit('light','You raise the lantern.',{x:this.state.x,y:this.state.y});return;}
  if(id==='blade'){if(o?.type==='binding'&&distance(o,this.state)<=1&&!this.state.world.trellisCut){this.checkpoint();this.state.world.trellisCut=true;this.emit('cut','The fibrous shoots part. The trellis falls away from the passage.');}else this.say('The edge finds nothing to part.');}
 }
}
function validate(s,legacy=false){try{
 if(!s||s.version!==2||s.campaign!==CAMPAIGN||!ROOMS[s.room]||!Number.isInteger(s.x)||!Number.isInteger(s.y)||s.x<0||s.x>=W||s.y<0||s.y>=H)return false;
 if(!Array.isArray(s.face)||s.face.length!==2||!Object.values(DIRS).some(d=>d[0]===s.face[0]&&d[1]===s.face[1]))return false;
 if(!Array.isArray(s.relics)||new Set(s.relics).size!==s.relics.length||s.relics.some(id=>!RELICS[id])||(s.relics.length?!s.relics.includes(s.equipped):s.equipped!==null))return false;
 if(!Array.isArray(s.visited)||!s.visited.includes(s.room)||s.visited.some(id=>!ROOMS[id]))return false;
 const edges=Object.keys(ROOMS).flatMap(id=>exitsFor(id).map(e=>[id,e.to].sort().join(':')));
 if(!Array.isArray(s.connections)||s.connections.some(e=>!edges.includes(e)))return false;
 const w=s.world;if(!w||['shadeClosed','cabinetOpen','trellisCut','damper'].some(k=>typeof w[k]!=='boolean')||!Array.isArray(w.cords)||w.cords.length!==2||w.cords.some(v=>typeof v!=='boolean'))return false;
 if(w.lanternAt!==null&&(!s.relics.includes('lantern')||OBJECTS[w.lanternAt]?.type!=='stand'))return false;
 if(s.relics.includes('blade')&&!w.cabinetOpen||w.trellisCut&&!s.relics.includes('blade'))return false;
 if(!s.positions||typeof s.positions!=='object'||Array.isArray(s.positions))return false;
 for(const[k,p]of Object.entries(s.positions)){if(!OBJECTS[k]?.movable||!Number.isInteger(p.x)||!Number.isInteger(p.y))return false;}
 if(!Array.isArray(s.observations)||s.observations.length>200||s.observations.some(e=>!OBJECTS[e.key]||e.room!==OBJECTS[e.key].room||typeof e.title!=='string'||e.title.length>200||!Array.isArray(e.texts)||e.texts.length>20||e.texts.some(t=>typeof t!=='string'||t.length>4000)))return false;
 if(typeof s.notes!=='string'||s.notes.length>4000||!Array.isArray(s.discoveries)||s.discoveries.some(d=>d!=='garden-letter'))return false;
 if(!Number.isFinite(s.seconds)||s.seconds<0||!Number.isInteger(s.steps)||s.steps<0)return false;
 if(!legacy){
 if(s.layoutRevision!==LAYOUT_REVISION||!validWorks(s)||!validToolState(s,OBJECTS))return false;
 for(const id of Object.keys(ROOMS)){
 const obs=ROOMS[id].objects.map(o=>({...o,...s.positions[id+':'+o.id]}));
 for(const o of obs.filter(o=>o.movable))for(const[x,y]of cells(o)){
 if(o.id==='ballast'&&(o.y!==7||o.x<4||o.x>10))return false;
 if(!WALKABLE.has(groundAt(id,x,y))||groundAt(id,x,y)==='D'||exitsFor(id).some(e=>e.landing[0]===x&&e.landing[1]===y)||obs.some(p=>p.id!==o.id&&!p.floor&&!(p.type==='bramble'&&w.tools.cut.includes(id+':'+p.id))&&cells(p).some(([a,b])=>a===x&&b===y)))return false;
 }
 }
 if(!WALKABLE.has(groundAt(s.room,s.x,s.y))||groundAt(s.room,s.x,s.y)==='D')return false;
 if(ROOMS[s.room].objects.some(o=>{const p={...o,...s.positions[s.room+':'+o.id]};return cells(p).some(([x,y])=>x===s.x&&y===s.y)&&!o.floor&&!(o.type==='binding'&&w.trellisCut)&&!(o.type==='bramble'&&w.tools.cut.includes(s.room+':'+o.id));}))return false;
 }
 return true;
 }catch{return false;}}
export function migrateSave(s){
 if(s&&s.toolRevision===undefined&&validate(s,true)){const next=clone(s);next.toolRevision=1;next.world.tools=toolDefaults();if(next.expansion===undefined){next.expansion=1;next.world.works=worksDefaults();}if(next.layoutRevision===undefined){next.layoutRevision=LAYOUT_REVISION;next.positions={};[next.x,next.y]=SPAWNS[next.room];}
 // New optional growth never materializes underneath an existing player or moved cart.
 for(const[id,room]of Object.entries(ROOMS))for(const o of room.objects)if(o.type==='bramble'&&((id===next.room&&o.x===next.x&&o.y===next.y)||room.objects.some(p=>p.movable&&cells({...p,...next.positions[id+':'+p.id]}).some(([x,y])=>x===o.x&&y===o.y))))next.world.tools.cut.push(id+':'+o.id);
 return next;}return s;
}
export function validSave(s){return validate(migrateSave(s));}
