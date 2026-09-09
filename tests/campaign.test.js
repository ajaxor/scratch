import assert from'node:assert/strict';
import{Game,validSave}from'../dist/engine.js';
import{ROOMS}from'../dist/content.js';
import{travel,operate,path,walk}from'./helpers.js';
const g=new Game();assert.equal(Object.keys(ROOMS).length,13);assert(validSave(g.snapshot()));
// Three genuine starting branches, without first solving a trial.
for(const id of ['A1','T1','C4','C3','C2']){travel(g,id);assert(!g.has('blade'));assert(validSave(g.snapshot()));}
// The two local catches alone cannot release the swollen cabinet.
travel(g,'C3');operate(g,'left-cord');operate(g,'right-cord');operate(g,'cabinet');assert(!g.state.world.cabinetOpen);assert(!g.has('blade'));
// A separate room changes the cabinet's physical condition; state survives travel/save.
travel(g,'C2');operate(g,'shade-wheel');const shaded=new Game(g.snapshot());assert(shaded.state.world.shadeClosed);travel(g,'C3');operate(g,'cabinet');assert(g.state.world.cabinetOpen);operate(g,'cabinet');assert(g.has('blade'));assert(validSave(g.snapshot()));
// Cabinet opening latches; later experimentation cannot take the tool away.
travel(g,'C2');operate(g,'shade-wheel');travel(g,'C3');operate(g,'left-cord');assert(g.state.world.cabinetOpen);assert(g.has('blade'));
travel(g,'C4');const binding=g.data.objects.find(o=>o.id==='binding');assert.equal(path(g,(x,y)=>x===14&&y===4),null);operate(g,'binding');assert(g.state.world.trellisCut);walk(g,path(g,(x,y)=>x===14&&y===4));operate(g,'seed-note');assert.deepEqual(g.state.discoveries,['garden-letter']);assert(validSave(g.snapshot()));
const restored=new Game(JSON.parse(JSON.stringify(g.snapshot())));assert.deepEqual(restored.snapshot(),g.snapshot());
// Lantern stays on its real stand across rooms, and can always be recovered.
travel(g,'A1');g.equip('lantern');operate(g,'reader-stand');assert.equal(g.state.world.lanternAt,'A1:reader-stand');operate(g,'relief','inspect');assert(g.state.observations.some(e=>e.texts.some(t=>t.includes('Side light'))));travel(g,'C2');operate(g,'garden-stand');assert.equal(g.state.world.lanternAt,'A1:reader-stand');travel(g,'A1');operate(g,'reader-stand');assert.equal(g.state.world.lanternAt,null);
// Global state and room crossing undo honestly.
travel(g,'C2');const wheel=g.data.objects.find(o=>o.id==='shade-wheel');walk(g,path(g,(x,y)=>Math.abs(x-wheel.x)+Math.abs(y-wheel.y)===1));const before=g.snapshot();g.interact(wheel);g.undo();assert.deepEqual(g.snapshot(),before);
const bads=[{}, {...g.snapshot(),version:1},{...g.snapshot(),x:-1},{...g.snapshot(),world:{...g.state.world,lanternAt:'H:chair'}},{...g.snapshot(),positions:{'C1:cart':{x:3,y:3}}}];for(const bad of bads)assert(!validSave(bad));
const untouched=new Game();assert(!untouched.state.world.cabinetOpen);travel(untouched,'C2');operate(untouched,'shade-wheel');travel(untouched,'C3');operate(untouched,'cabinet');assert(!untouched.state.world.cabinetOpen,'Shade alone must not solve cabinet');
console.log('PASS: three opening branches, remote cabinet puzzle, relic reward, trellis discovery, placed Lantern, global undo and save validation.');
