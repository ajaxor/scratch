import assert from'node:assert/strict';
import{Game,validSave}from'../dist/engine.js';
import{ROOMS,DOOR_POS,DIRS,exitsFor}from'../dist/content.js';
import{path,travel,walk}from'./helpers.js';
for(const cut of [false,true])for(const id of Object.keys(ROOMS)){
 const g=new Game();if(cut){g.state.world.cabinetOpen=true;g.state.relics.push('blade');g.state.world.trellisCut=true;}travel(g,id);
 assert(g.passable(g.state.x,g.state.y),'Safe spawn '+id);assert(validSave(g.snapshot()));
 const positions=new Set();for(const o of g.data.objects){const key=o.x+','+o.y;assert(!positions.has(key),'Overlapping props in '+id+':'+key);positions.add(key);assert.equal(g.tile(o.x,o.y),'.','Prop embedded in wall/water '+id+':'+o.id);if(cut||!(id==='C4'&&['seed-note','root-boundary'].includes(o.id)))assert(path(g,(x,y)=>Math.abs(x-o.x)+Math.abs(y-o.y)<=1),'Unreachable object '+id+':'+o.id);}
 for(const e of exitsFor(id)){
  const back=exitsFor(e.to).find(b=>b.to===id);assert(back,'Reciprocal edge '+id);const[x,y]=DOOR_POS[e.dir],[dx,dy]=DIRS[e.dir];walk(g,path(g,(a,b)=>a===x-dx&&b===y-dy));const from=g.snapshot();assert(g.move(dx,dy));assert.equal(g.state.room,e.to);assert(g.passable(g.state.x,g.state.y));g.undo();assert.equal(g.state.room,id);assert.equal(g.state.x,from.x);assert.equal(g.state.y,from.y);
 }
}
console.log('PASS: every doorway and object is reachable, reciprocal spawns are safe, the loop is open, and the trellis has no bypass.');
