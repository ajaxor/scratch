import{SKY}from'./tool-content.js';
import{W,H}from'./content.js';
export function clearLine(g,a,b){
 let x=a.x,y=a.y;const dx=Math.abs(b.x-x),sx=x<b.x?1:-1,dy=-Math.abs(b.y-y),sy=y<b.y?1:-1;let err=dx+dy;
 while(x!==b.x||y!==b.y){const twice=2*err;if(twice>=dy){err+=dy;x+=sx;}if(twice<=dx){err+=dx;y+=sy;}
  if(x===b.x&&y===b.y)return true;
  if(['#',' ','O'].includes(g.tile(x,y)))return false;
 }return true;
}
export function lightSources(g){const s=g.state,t=s.world.tools,result=[];
 if(g.has('lantern')&&!s.world.lanternAt)result.push({x:s.x,y:s.y,r:3.3});
 for(const o of g.data.objects){const key=s.room+':'+o.id;
  if(o.type==='lamp'&&t.lamps.includes(key))result.push({...o,r:4});
  if(o.type==='lantern-pickup'&&!g.has('lantern'))result.push({...o,r:2.3});
  if(o.type==='stand'&&s.world.lanternAt===key)result.push({...o,r:3.3});
  if(o.type==='ivy-window'&&t.cut.includes(key))result.push({...o,r:3.5});
  if(o.type==='tideglass'&&!g.has('tideglass'))result.push({...o,r:3.5});
 }
 if(s.room==='C3'&&!s.world.shadeClosed)result.push({x:3,y:2,r:4.2});
 if(s.room==='H'&&s.world.works.tideLit)result.push({x:4,y:2,r:4});
 return result;
}
export function lightMap(g){const s=g.state;const key=[s.room,s.x,s.y,g.has('lantern'),g.has('tideglass'),s.world.lanternAt,s.world.shadeClosed,s.world.works.tideLit,JSON.stringify(s.world.tools)].join('|');if(g._light?.key===key)return g._light.map;
 const sources=lightSources(g),sky=SKY[s.room]||[],map=Array.from({length:H},()=>Array(W).fill(false));
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)map[y][x]=sky.some(([a,b,c,d])=>x>=a&&x<=c&&y>=b&&y<=d)||sources.some(o=>Math.hypot(o.x-x,o.y-y)<=o.r&&clearLine(g,o,{x,y}));
 g._light={key,map};return map;
}
