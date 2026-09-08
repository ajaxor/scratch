import assert from'node:assert/strict';
import{Game}from'../dist/engine.js';
import{Renderer}from'../dist/renderer.js';
import{ROOMS}from'../dist/content.js';
import{travel}from'./helpers.js';
// Exercise complete frames without a browser, including the archive relief that
// previously threw before the player draw and stopped requestAnimationFrame.
globalThis.Image=class{set src(value){} };
globalThis.matchMedia=()=>({matches:true});
const gradient={addColorStop(){}};
const ctx=new Proxy({createRadialGradient:()=>gradient},{get:(o,k)=>k in o?o[k]:()=>{}});
for(const lanternAt of[null,'A1:reader-stand']){
 const game=new Game(),renderer=new Renderer({getContext:()=>ctx},game);
 game.state.world.lanternAt=lanternAt;
 let playerDraws=0;
 renderer.sprite=(index)=>{if(index>=0&&index<=3)playerDraws++;};
 for(const id of Object.keys(ROOMS)){
  travel(game,id);playerDraws=0;
  assert.doesNotThrow(()=>renderer.draw(1000),'Complete room frame: '+id);
  assert.equal(playerDraws,1,'Visible player: '+id);
  assert.doesNotThrow(()=>renderer.draw(1033),'Subsequent animation frame: '+id);
  assert.equal(playerDraws,2);
 }
}
console.log('PASS: every room renders the player and subsequent frames, with carried and placed Lantern.');
