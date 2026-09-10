import{clearLine}from'./lighting.js';
const key=(g,o)=>g.state.room+':'+o.id;
export const isCut=(g,o)=>g.state.world.tools.cut.includes(key(g,o));
export function visibleObject(g,o){if(o.lightOnly&&!g.isLit(o.x,o.y))return false;if(o.echoOnly&&!g.state.world.tools.echoes.includes(key(g,o)))return false;return true;}
export function rangeFor(g,o,id=g.state.equipped){return id==='hook'?(o?.type==='anchor'?10:o?.movable||o?.type==='grate'?4:1):1;}
export function toolFor(o){if(o?.movable)return 'hook';if(o?.type==='niche'&&o.id==='window-0')return 'tideglass';return({lamp:'lantern',bramble:'blade',parcel:'blade','ivy-window':'blade',binding:'blade',rootmat:'blade',anchor:'hook',grate:'hook',mouth:'bell'})[o?.type];}
export function playDescription(g,o){const t=g.state.world.tools;
 if(o.type==='lantern-pickup')return g.has('lantern')?'A clean patch remains beside the boots.':'A lantern burns beside abandoned boots.';
 if(o.type==='lamp')return t.lamps.includes(key(g,o))?'The lamp burns steadily.':'Oil darkens the unlit wick.';
 if(['bramble','ivy-window','parcel'].includes(o.type))return isCut(g,o)?({bramble:'Cut stems lie on the clear paving.','ivy-window':'Daylight reaches the room again.',parcel:'Inside: a child’s wooden cart, wrapped for the crossing.'})[o.type]:o.text;
 if(o.type==='echo-panel')return 'The stone has swung open. A small cup waits inside, beside a child’s handprint.';
 return null;
}
export function interactPlay(g,o){
 if(o.type==='lantern-pickup'){
  if(g.has('lantern')){g.say('Only the boot prints remain.');return true;}
  g.checkpoint();g.state.relics.push('lantern');g.state.equipped='lantern';g.emit('relic','Warm light follows you now.',{relic:'lantern'});return true;
 }
 const tool=toolFor(o);if(tool&&g.state.equipped===tool){g.use(tool,o);return true;}return false;
}
export function usePlay(g,id,o){const t=g.state.world.tools;
 if(id==='lantern'&&o?.type==='lamp'){
  if(g.state.world.lanternAt){g.say('Take your lantern from its stand first.');return true;}
  if(t.lamps.includes(key(g,o))){g.say('The lamp is already burning.');return true;}
  g.checkpoint();t.lamps.push(key(g,o));g.emit('light','The wick catches.',{x:o.x,y:o.y});return true;
 }
 if(id==='blade'&&['bramble','ivy-window','parcel'].includes(o?.type)){
  if(isCut(g,o)){g.say('Already clear.');return true;}
  g.checkpoint();t.cut.push(key(g,o));g.emit('cut',o.type==='ivy-window'?'Daylight spills through.':o.type==='parcel'?'The cord parts. A little wooden cart tumbles out.':'The growth falls away.',{x:o.x,y:o.y});return true;
 }
 if(id==='hook'&&o?.type==='anchor'){
  if(!g.isLit(o.x,o.y)){g.say('You cannot make out the ring in the dark.');return true;}
  if(!clearLine(g,g.state,o)||!g.passable(o.x,o.y)){g.say('Stone blocks the line.');return true;}
  if(o.x===g.state.x&&o.y===g.state.y){g.say('You are already at the ring.');return true;}
  const from={x:g.state.x,y:g.state.y};g.checkpoint();g.state.x=o.x;g.state.y=o.y;g.state.steps++;g.emit('hook','The line draws you across.',{from,to:{x:o.x,y:o.y}});return true;
 }
 if(id==='hook'&&o?.movable&&(Math.abs(g.state.x-o.x)+Math.abs(g.state.y-o.y)>1)){
  const dx=Math.sign(g.state.x-o.x),dy=Math.sign(g.state.y-o.y);
  if(dx&&dy||!clearLine(g,g.state,o)||!g.canPush(o,dx,dy)){g.say('The ring needs a clear, straight pull.');return true;}
  g.checkpoint();g.state.positions[key(g,o)]={x:o.x+dx,y:o.y+dy};g.emit('hook','The ring catches. Wheels scrape closer.',{from:{x:g.state.x,y:g.state.y},to:{x:o.x,y:o.y}});return true;
 }
 if(id==='bell'){
  const found=g.data.objects.filter(p=>p.echoOnly&&!t.echoes.includes(key(g,p))&&Math.hypot(p.x-g.state.x,p.y-g.state.y)<=5&&clearLine(g,g.state,p));
  if(found.length){g.checkpoint();t.echoes.push(...found.map(p=>key(g,p)));}
  g.emit('pulse',found.length?'A hollow answer. A stone shifts.':'The note travels through the stone.',{x:g.state.x,y:g.state.y});
  if(o?.type==='mouth')return false;return true;
 }
 return false;
}
export function validToolState(s,objects){const t=s.world.tools;if(s.toolRevision!==1||!t)return false;
 const allowed={lamps:['lamp'],cut:['bramble','ivy-window','parcel'],echoes:['echo-panel']};
 for(const[k,types]of Object.entries(allowed))if(!Array.isArray(t[k])||new Set(t[k]).size!==t[k].length||t[k].some(id=>!types.includes(objects[id]?.type)))return false;
 if(t.lamps.length&&!s.relics.includes('lantern')||t.echoes.length&&!s.relics.includes('bell'))return false;return true;
}
