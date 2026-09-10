import{lightMap,lightSources}from'./lighting.js';
import{isCut}from'./tool-play.js';
const T=48;
// Use the same tile states for rendering and interaction. Dark rooms retain a
// navigable silhouette, but their markings never leak through the shade.
export function shadeRoom(r){const g=r.game,map=lightMap(g),c=r.ctx;c.save();
 for(let y=0;y<13;y++)for(let x=0;x<17;x++)if(!map[y][x])r.rect(x*T,y*T,T,T,'#07122480');
 for(const source of lightSources(g)){c.save();c.beginPath();for(let y=0;y<13;y++)for(let x=0;x<17;x++)if(map[y][x])c.rect(x*T,y*T,T,T);c.clip();r.glow(source.x*T+24,source.y*T+24,source.r*T,'#f5c77b18');c.restore();}c.restore();}
export function toolObject(r,o,t){const g=r.game,w=g.state.world,x=o.x*T,y=o.y*T,cx=x+24,cy=y+24,key=g.state.room+':'+o.id;
 if(!g.visible(o))return true;
 if(o.type==='lantern-pickup'){if(!g.has('lantern')){r.sprite(8,x+4,y-8,40,50);r.glow(cx,cy,64,'#ffd68155');}return true;}
 if(o.type==='lamp'){const lit=w.tools.lamps.includes(key);r.prop(lit?9:8,x+3,y-8,42,52,lit?1:.7);if(lit)r.glow(cx,cy,55,'#ffd28545',r.reduced?1:.9+Math.sin(t*5+o.x)*.1);return true;}
 if(o.type==='bramble'){r.sprite(12,x-7,y-12,62,62,isCut(g,o)?.16:1);if(isCut(g,o))r.sprite(12,x+4,y+31,32,10,.55);return true;}
 if(o.type==='ivy-window'){r.arch(14,x+3,y-22,42,64);if(!isCut(g,o))r.sprite(12,x-4,y-18,57,61);return true;}
 if(o.type==='parcel'){r.furnishing(isCut(g,o)?14:12,x+7,y+3,34,34);return true;}
 if(o.type==='anchor'){r.arch(3,x+10,y+3,28,39);r.ring(cx,y+14,9,'#c5bd92',3);r.ring(cx,y+14,5,'#3d5458',2);return true;}
 if(o.type==='echo-panel'){r.furnishing(1,x+3,y-8,42,52);r.furnishing(10,x+13,y+15,22,22);return true;}
 if(o.type==='light-mark'){r.text(o.glyph,cx,cy,'#f1d997',o.glyph.length>2?15:24,'sans-serif');return true;}
 return false;
}
export function drawEffects(r,time){const c=r.ctx;r.effects=r.effects.filter(e=>time-e.start<e.duration);
 for(const e of r.effects){const p=Math.max(0,(time-e.start)/e.duration);c.save();c.globalAlpha=1-p;
 if(e.type==='pulse'){r.ring(e.x*T+24,e.y*T+24,(r.reduced?.8:p)*5*T,'#b1e9f0',3);for(const o of r.game.data.objects)if(o.echoOnly&&r.game.visible(o))r.ring(o.x*T+24,o.y*T+24,15+p*12,'#ffe0a0',2);}
 if(e.type==='light'){r.ring(e.x*T+24,e.y*T+24,15+p*50,'#ffdb91',3);}
 if(e.type==='hook'){c.strokeStyle='#e7c894';c.lineWidth=2;c.beginPath();c.moveTo(e.from.x*T+24,e.from.y*T+24);c.lineTo(e.to.x*T+24,e.to.y*T+14);c.stroke();r.ring(e.to.x*T+24,e.to.y*T+14,10,'#f8e2ac',2);}
 c.restore();}
}
