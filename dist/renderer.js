import{W,H,ZONES,DOOR_POS,exitsFor}from'./content.js?v=opening-1';
const T=48;
export class Renderer{
 constructor(canvas,game){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.game=game;this.atlas=new Image();this.atlas.src='assets/atlas.webp';this.atlas.onload=()=>this.ready=true;this.props=new Image();this.props.src='assets/mechanisms.webp';this.props.onload=()=>this.propsReady=true;this.furniture=new Image();this.furniture.src='assets/furnishings.webp';this.furniture.onload=()=>this.furnitureReady=true;this.width=W*T;this.height=H*T;canvas.width=this.width*2;canvas.height=this.height*2;this.ctx.setTransform(2,0,0,2,0,0);this.px=game.state.x*T;this.py=game.state.y*T;this.lastRoom='';this.particles=[];this.target=null;this.shake=0;this.flash=0;this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;}
 sprite(index,x,y,w=T,h=w,alpha=1){if(!this.ready)return;const c=this.ctx,s=this.atlas.width/4;c.save();c.globalAlpha*=alpha;c.imageSmoothingEnabled=true;c.drawImage(this.atlas,(index%4)*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 prop(index,x,y,w=T,h=w,alpha=1){if(!this.propsReady)return;const c=this.ctx,s=this.props.width/4;c.save();c.globalAlpha*=alpha;c.drawImage(this.props,(index%4)*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 glow(x,y,r,color,strength=1){const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.save();c.globalAlpha=strength;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore();}
 rect(x,y,w,h,color){const c=this.ctx;c.fillStyle=color;c.fillRect(x,y,w,h)}
 ring(x,y,r,color,width=1){const c=this.ctx;c.beginPath();c.strokeStyle=color;c.lineWidth=width;c.arc(x,y,r,0,Math.PI*2);c.stroke()}
 text(text,x,y,color='#c4d6c7',size=13,font='Georgia'){const c=this.ctx;c.font=`${size}px ${font}`;c.textAlign='center';c.textBaseline='middle';c.fillStyle=color;c.fillText(text,x,y)}
 burst(x,y,color='#e8ca81',n=20){if(this.reduced)return;for(let i=0;i<n;i++)this.particles.push({x:x*T+T/2,y:y*T+T/2,vx:(Math.random()-.5)*2.7,vy:(Math.random()-.7)*2.7,life:1,color})}
 draw(time){const g=this.game,s=g.state,d=g.data,r=g.room,c=this.ctx,t=time/1000;const zone=ZONES[r.zone];if(this.lastRoom!==s.room){this.px=s.x*T;this.py=s.y*T;this.lastRoom=s.room;this.particles=[];this.target=null;}const moving=Math.abs(this.px-s.x*T)+Math.abs(this.py-s.y*T)>1;this.px+=(s.x*T-this.px)*(this.reduced?1:.28);this.py+=(s.y*T-this.py)*(this.reduced?1:.28);c.clearRect(0,0,this.width,this.height);this.rect(0,0,this.width,this.height,'#08171d');
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const tile=g.tile(x,y),xx=x*T,yy=y*T;if(tile==='~'){this.sprite(6,xx,yy,T+1,T+1,.35);this.rect(xx,yy,T+1,T+1,zone?.id==='forge'?'#321a1966':'#071d3266');if(!this.reduced){c.strokeStyle=`rgba(113,195,198,${.035+Math.sin(t*1.1+x*.8+y)*.02})`;c.lineWidth=1;c.beginPath();c.moveTo(xx+6,yy+25+Math.sin(t+x)*3);c.lineTo(xx+36,yy+25+Math.sin(t+x)*3);c.stroke();}}else{if(this.propsReady){const fi=r.zone===3?14:r.zone===2?13:r.zone===4?((x+y)%5===0?15:13):12;this.prop(fi,xx,yy,T+1,T+1,.55);}else this.sprite(4,xx,yy,T+1,T+1,.5);this.rect(xx,yy,T+1,T+1,zone?zone.tint+'55':'#0b22224d');this.rect(xx,yy,T,1,'#12303580');this.rect(xx,yy,1,T,'#12303580');const n=((x*127+y*73+r.index*33)%29);if(n===1||n===7){this.rect(xx+15,yy+27,5,2,'#71987844');this.rect(xx+31,yy+8,2,6,'#71987833')}}}
 // The interior has a warm pool of light; the edges remain submerged in blue.
 this.glow(8.5*T,6.5*T,340,zone?zone.color+'14':'#77cbb312');
 if(['C2','C3'].includes(s.room)&&!s.world.shadeClosed){c.save();c.fillStyle='#f3d69b20';c.beginPath();c.moveTo(12*T,2*T);c.lineTo(13*T,2*T);c.lineTo(8*T,7*T);c.lineTo(6*T,7*T);c.closePath();c.fill();c.restore();}
 if(s.room==='A1'&&s.world.lanternAt==='A1:reader-stand'){c.save();c.strokeStyle='#080e17cc';c.lineWidth=5;c.beginPath();c.moveTo(9*T+24,5*T+24);c.lineTo(11*T,4*T);c.stroke();c.strokeStyle='#d9c79c';c.lineWidth=1;c.strokeRect(9*T+9,5*T+6,24,30);c.restore();}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(g.tile(x,y)==='#'){const xx=x*T,yy=y*T;this.rect(xx+5,yy+6,T,T,'#020c1280');this.sprite(5,xx,yy-9,T,T,.88);this.rect(xx,yy+T-10,T,10,'#0b2029');this.rect(xx+1,yy+T-10,T-2,1,'#50676870');this.rect(xx,yy-9,T,T,zone?zone.tint+'33':'#0d243522');}
 for(const [tx,ty] of [[3,1],[13,1],[3,11],[13,11]]){this.sprite(8,tx*T+16,ty*T-6,17,27,.95);this.glow(tx*T+24,ty*T+8,65,'#f0b94924',.85+Math.sin(t*4+tx)*.1);}if(zone?.id==='grove'||r.id==='H'){for(const [tx,ty] of [[1,1],[14,1],[1,10],[14,10]])this.sprite(12,tx*T-7,ty*T-15,61,68,.72);}
 for(const e of exitsFor(s.room)){const[x,y]=DOOR_POS[e.dir],open=g.allowedExit(e);this.rect(x*T+4,y*T+4,T-8,T-8,open?'#052a2b':'#221e24');this.glow(x*T+24,y*T+24,65,open?'#7be6d04d':'#a06a7330');this.sprite(7,x*T-8,y*T-22,64,73,open?1:.52);if(!open){this.text('◇',x*T+24,y*T+23,'#c09073',25);for(let k=0;k<3;k++)this.rect(x*T+13+k*10,y*T+12,2,26,'#a58e6377');}else{const dir=e.dir;this.text(({N:'↑',E:'→',S:'↓',W:'←'})[dir],x*T+24,y*T+24,'#bce3c7',15,'sans-serif');}}
 if(this.target){this.ring(this.target.x*T+24,this.target.y*T+24,10+Math.sin(t*4)*2,'#dec48c88');this.ring(this.target.x*T+24,this.target.y*T+24,3,'#dec48cbb');}
 const actors=d.objects.map(o=>({y:o.y,draw:()=>this.object(o,t)}));actors.push({y:this.py/T,draw:()=>{const x=this.px,y=this.py,bob=moving&&!this.reduced?Math.sin(t*17)*2:0;const facing=s.face[0]<0?2:s.face[0]>0?3:s.face[1]<0?1:0;c.save();c.fillStyle='#0006';c.beginPath();c.ellipse(x+24,y+37,18,7,0,0,7);c.fill();c.restore();if(!s.world.lanternAt)this.glow(x+21,y+24,115,'#e5b35430');this.sprite(facing,x-9,y-24+bob,66,70);if(!s.world.lanternAt)this.glow(x+13,y+20+bob,25,'#ffcd6744');}});actors.sort((a,b)=>a.y-b.y).forEach(a=>a.draw());
 // Floating motes give the room life without obscuring the puzzle.
 if(!this.reduced){for(let i=0;i<24;i++){const x=(i*139+Math.sin(t*.25+i)*24)%this.width,y=(i*83-t*(3+i%3)+this.height*100)%this.height;this.rect(x,y,i%4===0?2:1,i%4===0?2:1,`rgba(175,221,183,${.11+Math.sin(t+i)*.09})`);}}
 const vignette=c.createRadialGradient(this.width/2,this.height/2,170,this.width/2,this.height/2,480);vignette.addColorStop(0,'transparent');vignette.addColorStop(1,'#020d16c9');c.fillStyle=vignette;c.fillRect(0,0,this.width,this.height);
 for(const p of this.particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.017;p.life-=.022;c.globalAlpha=Math.max(0,p.life);this.rect(p.x,p.y,3,3,p.color)}c.globalAlpha=1;this.particles=this.particles.filter(p=>p.life>0);if(this.flash>0){this.rect(0,0,this.width,this.height,`rgba(197,237,206,${this.flash})`);this.flash*=.93;if(this.flash<.002)this.flash=0;}

 }
 furnishing(index,x,y,w=T,h=w,alpha=1){if(!this.furnitureReady)return;const c=this.ctx,s=this.furniture.width/4;c.save();c.globalAlpha*=alpha;c.drawImage(this.furniture,index%4*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 object(o,t){const g=this.game,s=g.state,w=s.world,x=o.x*T,y=o.y*T,cx=x+24,cy=y+24;
  let sprite=o.furnishing;
  if(o.type==='cabinet')sprite=w.cabinetOpen?1:0;
  if(o.type==='cord')sprite=w.cords[o.index]?2:3;
  if(o.type==='shutter'||o.type==='shade')sprite=w.shadeClosed?4:5;
  if(o.type==='binding'&&w.trellisCut){this.sprite(12,x+4,y+23,37,20,.4);return;}
  if(o.type==='niche'){this.prop(8,x+8,y-5,32,40,.5);return;}
  if(o.type==='inscription'){this.prop(10,x,y-9,48,55,.88);return;}
  if(o.type==='mark'){this.rect(x+6,y+23,36,2,'#b2ae8855');this.rect(x+7,y+27,30,1,'#b2ae8833');return;}
  if(o.type==='binding'){this.furnishing(7,x-5,y-18,58,66,.65);this.sprite(12,x-5,y-10,58,58);return;}
  if(sprite!==undefined){const large=o.type==='cabinet',size=large?86:o.type==='cord'?58:o.type==='shutter'?66:58;this.furnishing(sprite,cx-size/2,y+43-size,size,size,o.type==='boundary'?.62:1);}
  if(o.type==='cabinet'&&!g.has('blade'))this.sprite(9,x+8,y-4,32,36,w.cabinetOpen?1:.38);
  if(o.type==='stand'&&w.lanternAt===s.room+':'+o.id){this.sprite(8,x+10,y-9,29,37);this.glow(cx,y+10,120,'#e5b35438');}
  if(o.type==='damper'){this.rect(x+(w.damper?27:14),y+18,4,13,'#bea67a');}
 }
 hitObject(p){const exact=this.game.objectsAt(p.x,p.y)[0];if(exact)return exact;return this.game.data.objects.filter(o=>{const size=o.type==='cabinet'?86:58;return !o.floor&&p.worldX>=o.x*T+24-size/2&&p.worldX<=o.x*T+24+size/2&&p.worldY>=o.y*T+43-size&&p.worldY<=o.y*T+43;}).sort((a,b)=>b.y-a.y)[0];}
 point(event){const b=this.canvas.getBoundingClientRect();const ratio=this.width/this.height;let w=b.width,h=b.height;if(w/h>ratio)w=h*ratio;else h=w/ratio;const x=(event.clientX-b.left-(b.width-w)/2)/w*W,y=(event.clientY-b.top-(b.height-h)/2)/h*H;return{x:Math.floor(x),y:Math.floor(y),worldX:x*T,worldY:y*T};}
}
