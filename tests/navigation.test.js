import assert from'node:assert/strict';
import{Game,validSave}from'../dist/engine.js';
import{ROOMS,DIRS,exitsFor}from'../dist/content.js';
import{WALKABLE}from'../dist/architecture.js';
import{path,travel,walk}from'./helpers.js';
for(const cut of [false,true])for(const id of Object.keys(ROOMS)){
 if(id==='W6'&&!cut)continue;const g=new Game();if(cut){g.state.world.cabinetOpen=true;g.state.relics.push('blade');g.state.world.trellisCut=true;g.state.relics.push('bell','hook');Object.assign(g.state.world.works,{archiveOpen:true,grateClear:true,rootsClear:true,tideGate:true});}travel(g,id);
 assert(g.passable(g.state.x,g.state.y),'Safe spawn '+id);assert(validSave(g.snapshot()));
 const positions=new Set();for(const o of g.data.objects){const key=o.x+','+o.y;assert(!positions.has(key),'Overlapping props in '+id+':'+key);positions.add(key);assert(WALKABLE.has(g.tile(o.x,o.y)),'Prop embedded in wall/water '+id+':'+o.id);if(cut||!(id==='C4'&&['seed-note','root-boundary'].includes(o.id)))assert(path(g,(x,y)=>Math.abs(x-o.x)+Math.abs(y-o.y)<=1),'Unreachable object '+id+':'+o.id);}
 for(const e of exitsFor(id)){
  if(!g.allowedExit(e))continue;const back=exitsFor(e.to).find(b=>b.to===id);assert(back,'Reciprocal edge '+id);const[x,y]=e.at,[dx,dy]=DIRS[e.dir];walk(g,path(g,(a,b)=>a===x-dx&&b===y-dy));const from=g.snapshot();assert(g.move(dx,dy));assert.equal(g.state.room,e.to);assert(g.passable(g.state.x,g.state.y));g.undo();assert.equal(g.state.room,id);assert.equal(g.state.x,from.x);assert.equal(g.state.y,from.y);
 }
}
console.log('PASS: every doorway and object is reachable, reciprocal spawns are safe, the loop is open, and the trellis has no bypass.');
// The architecture itself must join in world space, not merely have graph edges.
const {ORIGINS,SPAWNS}=await import('../dist/architecture.js');
for(const id of Object.keys(ROOMS))for(const e of exitsFor(id)){
 const back=exitsFor(e.to).find(b=>b.to===id);
 assert.deepEqual(e.at.map((n,i)=>n+ORIGINS[id][i]),back.at.map((n,i)=>n+ORIGINS[e.to][i]),'Aligned threshold '+id+' → '+e.to);
}
// Previous opening saves retain the player's conclusions and completed work.
const legacy=new Game().snapshot();delete legacy.layoutRevision;delete legacy.expansion;delete legacy.world.works;legacy.room='C3';legacy.visited.push('C3');legacy.x=8;legacy.y=8;legacy.world.cabinetOpen=true;legacy.world.trellisCut=true;legacy.world.lanternAt='A1:reader-stand';legacy.relics.push('blade');legacy.notes='The wheel moves something beyond the wall.';legacy.positions={'C1:cart':{x:7,y:6}};
const migrated=new Game(legacy);assert(validSave(migrated.snapshot()));const {works,...originalWorld}=migrated.state.world;assert.deepEqual(originalWorld,legacy.world);assert.equal(migrated.state.notes,legacy.notes);assert.deepEqual([migrated.state.x,migrated.state.y],SPAWNS.C3);assert.deepEqual(migrated.state.positions,{});assert.equal(legacy.layoutRevision,undefined);
// Both cells of a cart must fit; pushing and undo preserve its anchor and footprint.
const cartGame=new Game();travel(cartGame,'C1');const cart=cartGame.data.objects.find(o=>o.id==='cart');assert.equal(cart.w,2);walk(cartGame,path(cartGame,(x,y)=>x===cart.x-1&&y===cart.y));const before=cartGame.snapshot();assert(cartGame.move(1,0));assert.equal(cartGame.state.positions['C1:cart'].x,cart.x+1);assert(validSave(cartGame.snapshot()));cartGame.undo();assert.deepEqual(cartGame.snapshot(),before);
const invalid=cartGame.snapshot();invalid.positions['C1:cart']={x:12,y:11};assert(!validSave(invalid),'Second cell cannot penetrate a wall');
console.log('PASS: world-aligned thresholds, legacy progress migration, full-footprint cart pushes and undo.');
