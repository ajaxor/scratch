import assert from'node:assert/strict';
import{Game,validSave,distance}from'../dist/engine.js';
import{ROOMS}from'../dist/content.js';
import{clearLine,lightMap}from'../dist/lighting.js';
import{Renderer}from'../dist/renderer.js';
import{path,walk,travel,operate,findLantern}from'./helpers.js';
const approach=(g,id)=>{const o=g.data.objects.find(o=>o.id===id);walk(g,path(g,(x,y)=>distance({x,y},o)===1));return o;};
function kit(){const g=new Game();findLantern(g);g.state.relics.push('blade','hook','bell');g.state.world.cabinetOpen=true;g.state.world.works.archiveOpen=true;assert(validSave(g.snapshot()));return g;}
const fresh=new Game();assert.deepEqual(fresh.state.relics,[]);assert.equal(fresh.state.equipped,null);assert(validSave(fresh.snapshot()));
travel(fresh,'A1');const ledger=approach(fresh,'borrowers-ledger');assert(!fresh.isLit(ledger.x,ledger.y));fresh.inspect(ledger);assert(!fresh.state.observations.some(o=>o.key==='A1:borrowers-ledger'),'Dark writing cannot enter the journal');
findLantern(fresh);assert.equal(fresh.state.equipped,'lantern');travel(fresh,'A1');operate(fresh,'borrowers-ledger','inspect');assert(fresh.state.observations.some(o=>o.key==='A1:borrowers-ledger'));
const lamp=approach(fresh,'lamp-0');fresh.interact(lamp);assert(fresh.state.world.tools.lamps.includes('A1:lamp-0'));operate(fresh,'reader-stand');assert.equal(fresh.state.world.lanternAt,'A1:reader-stand');travel(fresh,'C2');travel(fresh,'A1');assert(fresh.isLit(lamp.x,lamp.y));const restored=new Game(fresh.snapshot());assert(restored.isLit(lamp.x,lamp.y));
// A physical wall blocks light even when the destination lies inside its radius.
const mock={state:{room:'test',x:1,y:1,world:{tools:{lamps:[],cut:[],echoes:[]},works:{tideLit:false},lanternAt:null}},has:id=>id==='lantern',data:{objects:[]},tile:(x,y)=>x===2?'#':'.'};
assert(!clearLine(mock,{x:1,y:1},{x:3,y:1}));assert(!lightMap(mock)[1][3]);assert(lightMap(mock)[1][1]);
const g=kit();travel(g,'H');g.equip('blade');const bramble=approach(g,'bramble-0');assert(!g.passable(bramble.x,bramble.y));g.interact(bramble);assert(g.passable(bramble.x,bramble.y));g.undo();assert(!g.passable(bramble.x,bramble.y));g.interact(bramble);assert(validSave(g.snapshot()));
const ivy=approach(g,'ivy-window');g.state.world.lanternAt='A1:reader-stand';assert(!g.isLit(ivy.x,ivy.y));g.interact(ivy);assert(g.isLit(ivy.x,ivy.y),'Cut ivy admits persistent daylight');g.undo();assert(!g.isLit(ivy.x,ivy.y));g.interact(ivy);g.state.world.lanternAt=null;
travel(g,'C2');operate(g,'parcel');assert(g.state.world.tools.cut.includes('C2:parcel'));assert(!g.state.world.works.tideGate,'Optional parcels do not advance the main puzzle');
// A hook reaches an otherwise inaccessible lower landing and always provides a return.
travel(g,'T1');g.equip('hook');const lower=g.data.objects.find(o=>o.id==='lower-anchor'),upper=g.data.objects.find(o=>o.id==='upper-anchor');assert.equal(path(g,(x,y)=>x===lower.x&&y===lower.y),null);walk(g,path(g,(x,y)=>x===upper.x&&y===upper.y));const before=g.snapshot();g.interact(lower);assert.deepEqual([g.state.x,g.state.y],[lower.x,lower.y]);assert(validSave(g.snapshot()));g.undo();assert.deepEqual(g.snapshot(),before);g.interact(lower);g.equip('blade');operate(g,'parcel');g.equip('hook');g.interact(upper);assert.deepEqual([g.state.x,g.state.y],[upper.x,upper.y]);
// Fixed well rings become a reusable shortcut once the far side is illuminated.
travel(g,'W2');g.equip('lantern');operate(g,'lamp-1');const west=g.data.objects.find(o=>o.id==='return-anchor'),east=g.data.objects.find(o=>o.id==='well-anchor');walk(g,path(g,(x,y)=>x===west.x&&y===west.y));g.equip('hook');g.interact(east);assert.equal(g.state.x,east.x);
// Pull from a distance rather than pushing; step back for a close pull.
travel(g,'C1');g.equip('blade');operate(g,'bramble-2');g.equip('hook');walk(g,path(g,(x,y)=>x===8&&y===10));let cart=g.data.objects.find(o=>o.id==='cart');g.interact(cart);assert.equal(g.state.positions['C1:cart'].x,9);assert.equal(g.state.x,8);g.interact(g.data.objects.find(o=>o.id==='cart'));assert.equal(g.state.positions['C1:cart'].x,8);assert.equal(g.state.x,7);assert(validSave(g.snapshot()));
// Invisible marks/panels cannot be hit; sounding the bell creates a persistent discovery.
travel(g,'H');const panel=approach(g,'echo-panel');assert(!g.visible(panel));const hit=Renderer.prototype.hitObject.call({game:g},{x:panel.x,y:panel.y,worldX:panel.x*48+24,worldY:panel.y*48+24});assert.notEqual(hit?.id,panel.id);g.equip('bell');g.use();assert(g.visible(panel));assert(g.events.some(e=>e.type==='pulse'));assert(new Game(g.snapshot()).visible(panel));g.undo();assert(!g.visible(panel));
const mark=g.data.objects.find(o=>o.lightOnly);g.state.world.lanternAt='A1:reader-stand';assert(!g.visible(mark));g.state.world.lanternAt=null;walk(g,path(g,(x,y)=>x===mark.x&&y===mark.y));assert(g.visible(mark));
// Old saves preserve carried tools, progress, notes and moved objects. Optional new
// growth is cleared only where it would overlap an existing player/cart footprint.
const old=kit().snapshot();delete old.toolRevision;delete old.world.tools;old.room='C1';old.x=12;old.y=10;old.notes='The window rod';old.positions={'C1:cart':{x:5,y:10}};const migrated=new Game(old);assert(validSave(migrated.snapshot()));assert.equal(migrated.state.x,old.x);assert.deepEqual(migrated.state.positions,old.positions);assert.equal(migrated.state.notes,old.notes);assert.deepEqual(migrated.state.relics,old.relics);assert(migrated.state.world.tools.cut.includes('C1:bramble-1'));assert(migrated.state.world.tools.cut.includes('C1:bramble-2'));
const beforeBlade=new Game().snapshot();delete beforeBlade.toolRevision;delete beforeBlade.world.tools;beforeBlade.room='C1';beforeBlade.visited.push('C1');beforeBlade.x=5;beforeBlade.y=10;beforeBlade.relics=['lantern'];beforeBlade.equipped='lantern';assert(validSave(new Game(beforeBlade).snapshot()));
for(const bad of[{...g.snapshot(),toolRevision:7},{...g.snapshot(),world:{...g.state.world,tools:{lamps:['H:lamp-0','H:lamp-0'],cut:[],echoes:[]}}}])assert(!validSave(bad));
for(const r of Object.values(ROOMS))assert.equal(new Set(r.objects.map(o=>o.id)).size,r.objects.length,'Unique fixture IDs '+r.id);
console.log('PASS: empty hands, lantern discovery, unreadable darkness, wall shadows, permanent lamps/daylight, optional cuts, two-way hook crossings and pulls, bell secrets, hit visibility, undo and pre-update saves.');
