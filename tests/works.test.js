import assert from'node:assert/strict';
import{Game,validSave,distance}from'../dist/engine.js';
import{flowing,balanced}from'../dist/works.js';
import{path,travel,walk,operate,findLantern}from'./helpers.js';
function approach(g,id){const o=g.data.objects.find(o=>o.id===id);assert(o,id);walk(g,path(g,(x,y)=>distance({x,y},o)===1));return o;}
function use(g,item,id){g.equip(item);g.use(item,approach(g,id));g.events=[];}
function blade(g){travel(g,'C2');if(!g.state.world.shadeClosed)operate(g,'shade-wheel');travel(g,'C3');for(const [i,id]of['left-cord','right-cord'].entries())if(!g.state.world.cords[i])operate(g,id);operate(g,'cabinet');operate(g,'cabinet');assert(g.has('blade'));}
function hook(g){travel(g,'W2');operate(g,'lift');assert(!g.has('hook'));travel(g,'W3');walk(g,path(g,(x,y)=>x===4&&y===7));assert(!g.move(0,0));for(let i=0;i<4;i++)assert(g.move(1,0));assert(balanced(g.state));travel(g,'W2');operate(g,'lift');assert(g.has('hook'));}
function bell(g){travel(g,'W4');operate(g,'rubbing','inspect');travel(g,'A1');g.equip('lantern');operate(g,'reader-stand');operate(g,'relief');assert(!g.has('bell'),'Light alone does not align the hand');operate(g,'ornament');operate(g,'relief');assert(!g.has('bell'));operate(g,'ornament');operate(g,'relief');assert(g.has('bell'));operate(g,'reader-stand');assert.equal(g.state.world.lanternAt,null);}
function water(g){travel(g,'W5');use(g,'blade','rootmat');travel(g,'W1');use(g,'hook','grate');operate(g,'diverter');assert(!flowing(g.state));operate(g,'diverter');assert(!flowing(g.state),'Open washing return still diverts the flow');travel(g,'C4');operate(g,'damper');assert(flowing(g.state));}
for(const order of[['hook','bell','blade'],['bell','blade','hook'],['blade','hook','bell']]){
 const g=new Game();
 // Every outer works room is initially explorable; the central loop needs no relic.
 for(const id of['W1','W2','W3','W4','W5']){travel(g,id);assert(validSave(g.snapshot()));}
 travel(g,'W5');walk(g,path(g,(x,y)=>x===15&&y===5));assert(!g.move(1,0));assert.equal(g.state.room,'W5');
 findLantern(g);
 for(const step of order)({hook,bell,blade})[step](g);
 travel(g,'W2');use(g,'bell','mouth-0');assert.deepEqual(g.state.world.works.song,[],'Dry well cannot count notes');
 water(g);travel(g,'W2');use(g,'bell','mouth-1');assert.deepEqual(g.state.world.works.song,[],'Wrong note resets safely');
 use(g,'bell','mouth-0');assert.deepEqual(g.state.world.works.song,[0]);
 // Shared state persists during a return to old rooms and a reload.
 travel(g,'C2');const restored=new Game(g.snapshot());assert.deepEqual(restored.snapshot(),g.snapshot());travel(g,'W2');
 use(g,'bell','mouth-2');use(g,'bell','mouth-1');assert(g.state.world.works.tideGate);assert(validSave(g.snapshot()));
 // Opening latches. Redirecting water cannot strand the player or close the reward room.
 travel(g,'W1');operate(g,'diverter');assert(!flowing(g.state));travel(g,'W6');operate(g,'tideglass');assert(g.has('tideglass'));assert(validSave(g.snapshot()));
 travel(g,'H');use(g,'tideglass','window-0');assert(g.state.world.works.tideLit);g.undo();assert(!g.state.world.works.tideLit);use(g,'tideglass','window-0');assert(validSave(g.snapshot()));
}
// Existing architectural saves retain exact spatial and notebook state.
const old=new Game().snapshot();delete old.toolRevision;delete old.world.tools;delete old.expansion;delete old.world.works;old.notes='A theory I want to keep';const upgraded=new Game(old);assert.equal(upgraded.state.notes,old.notes);assert.equal(upgraded.state.x,old.x);assert.equal(upgraded.state.y,old.y);assert(validSave(upgraded.snapshot()));
// Remote actions cannot bypass physical reach; a ballast cannot be pushed off its rails.
const g=new Game();travel(g,'W3');const ballast=g.data.objects.find(o=>o.id==='ballast');assert(!g.canPush(ballast,0,1));assert(!g.canPush({...ballast,x:10},1,0));g.equip('lantern');g.use('lantern',{type:'stand',id:'remote',x:99,y:99});assert.equal(g.state.world.lanternAt,null);
console.log('PASS: three independent acquisition orders, open works loop, remote hydraulics, wrong experiments, signal gate, beacon, save migration and undo.');
