import{shadeRoom,toolObject,drawEffects}from'./tool-render.js';
import{balanced,flowing}from'./works.js';
import{ORIGINS,SCENERY}from'./architecture.js';
import{W,H,ZONES,exitsFor}from'./content.js';
const T=48;
export class Renderer{
 constructor(canvas,game){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.game=game;this.atlas=new Image();this.atlas.src='assets/atlas.webp';this.atlas.onload=()=>this.ready=true;this.props=new Image();this.props.src='assets/mechanisms.webp';this.props.onload=()=>this.propsReady=true;this.furniture=new Image();this.furniture.src='assets/furnishings.webp';this.furniture.onload=()=>this.furnitureReady=true;this.architecture=new Image();this.architecture.onload=()=>this.architectureReady=true;this.architecture.src='assets/cloister.webp';this.explorer=new Image();this.explorer.onload=()=>this.explorerReady=true;this.explorer.src='assets/explorer.webp';this.effects=[];this.width=W*T;this.height=H*T;canvas.width=this.width*2;canvas.height=this.height*2;this.ctx.setTransform(2,0,0,2,0,0);this.px=game.state.x*T;this.py=game.state.y*T;this.lastRoom='';this.particles=[];this.target=null;this.shake=0;this.flash=0;this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;}
 sprite(index,x,y,w=T,h=w,alpha=1){if(!this.ready)return;const c=this.ctx,s=this.atlas.width/4;c.save();c.globalAlpha*=alpha;c.imageSmoothingEnabled=true;c.drawImage(this.atlas,(index%4)*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 prop(index,x,y,w=T,h=w,alpha=1){if(!this.propsReady)return;const c=this.ctx,s=this.props.width/4;c.save();c.globalAlpha*=alpha;c.drawImage(this.props,(index%4)*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 glow(x,y,r,color,strength=1){const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.save();c.globalAlpha=strength;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore();}
 rect(x,y,w,h,color){const c=this.ctx;c.fillStyle=color;c.fillRect(x,y,w,h)}
 ring(x,y,r,color,width=1){const c=this.ctx;c.beginPath();c.strokeStyle=color;c.lineWidth=width;c.arc(x,y,r,0,Math.PI*2);c.stroke()}
 text(text,x,y,color='#c4d6c7',size=13,font='Georgia'){const c=this.ctx;c.font=`${size}px ${font}`;c.textAlign='center';c.textBaseline='middle';c.fillStyle=color;c.fillText(text,x,y)}
 burst(x,y,color='#e8ca81',n=20){if(this.reduced)return;for(let i=0;i<n;i++)this.particles.push({x:x*T+T/2,y:y*T+T/2,vx:(Math.random()-.5)*2.7,vy:(Math.random()-.7)*2.7,life:1,color})}
 draw(time){const g=this.game,s=g.state,d=g.data,r=g.room,c=this.ctx,t=time/1000;const zone=ZONES[r.zone];if(this.lastRoom!==s.room){this.px=s.x*T;this.py=s.y*T;this.lastRoom=s.room;this.particles=[];this.effects=[];this.target=null;}const moving=Math.abs(this.px-s.x*T)+Math.abs(this.py-s.y*T)>1;this.px+=(s.x*T-this.px)*(this.reduced?1:.28);this.py+=(s.y*T-this.py)*(this.reduced?1:.28);c.clearRect(0,0,this.width,this.height);this.rect(0,0,this.width,this.height,'#08171d');
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)this.ground(g.tile(x,y),x,y,t);
 // One tree has one world position, even when seen from another arcade.
 if(['C1','C2','C3','C4'].includes(s.room)){
 const[ox,oy]=ORIGINS[s.room];this.arch(0,(11.5-ox)*T,(6-oy)*T,9*T,12*T,.85);
 }
 this.glow(8.5*T,6.5*T,340,zone?zone.color+'14':'#77cbb312');
 if(s.room==='C3'&&!s.world.shadeClosed){c.save();c.fillStyle='#f3d69b26';c.beginPath();c.moveTo(3*T,2*T);c.lineTo(4*T,2*T);c.lineTo(10*T,4*T);c.lineTo(7*T,4*T);c.closePath();c.fill();c.restore();}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
 const tile=g.tile(x,y),xx=x*T,yy=y*T;
 if(tile==='#'){this.rect(xx+5,yy+6,T,T,'#020c1280');this.sprite(5,xx,yy-9,T,T,.88);this.rect(xx,yy+T-10,T,10,'#0b2029');this.rect(xx+1,yy+T-10,T-2,1,'#50676870');}
 if(tile==='r'){this.arch(10,xx-3,yy-12,T+6,T+12,.9);}
 }
 // A square drive shaft physically crosses the garden/workshop wall.
 if(s.room==='C2'||s.room==='C3'){const x=s.room==='C2'?14*T:0,w=s.room==='C2'?3*T:3.7*T;this.rect(x,2*T+9,w,7,'#10191b');this.rect(x,2*T+9,w,2,'#ac9670');for(let k=0;k<w;k+=T)this.rect(x+k,2*T+6,5,13,'#697569');}
 if(s.room==='C3'){
 this.rect(3*T+22,2*T+17,8*T,4,'#b89a64');this.rect(8*T+38,2*T+17,4,25,'#b89a64');
 this.rect(8*T+35+(s.world.shadeClosed?6:0),2*T+17,4,25,s.world.shadeClosed?'#7d9f8a':'#d0a968');
 }
 if(s.room==='W3'){for(let i=4;i<=10;i++){this.rect(i*T,7*T+9,T,2,'#b4aa7588');this.rect(i*T,7*T+37,T,2,'#b4aa7588');}this.rect(9*T+20,0,6,7*T,'#8c8a65');}
 if(s.room==='W2'){this.rect(4*T+21,0,5,3*T+8,'#9a9067');if(flowing(s))this.glow(8.5*T,6.5*T,160,'#47c8dd33');for(let i=0;i<3;i++){const raised=s.world.works.tideGate||s.world.works.song.length>i;this.rect((8+i)*T+7,5*T+5,26,34,'#16282c');this.rect((8+i)*T+11,5*T+(raised?7:25),18,8,raised?'#e5cb82':'#798d8b');}}
 if(s.room==='W1'){const w=s.world.works,active=w.grateClear&&w.rootsClear;for(let i=0;i<3;i++){this.rect((5+i)*T,3*T+15,5,(i===2?2:1)*T,active&&w.diverter===i?'#86b9a6':'#606e69');}}
 if(s.room==='C4'){this.rect(9*T+20,5*T+18,2*T,7,'#736e53');this.rect(9*T+20,5*T+19,2*T,2,'#a69b76');}
 for(const e of exitsFor(s.room)){const[x,y]=e.at;this.rect(x*T+4,y*T+4,T-8,T-8,'#052a2b');this.glow(x*T+24,y*T+24,50,'#7be6d025');this.sprite(7,x*T-8,y*T-22,64,73);if(g.allowedExit(e))this.text(({N:'↑',E:'→',S:'↓',W:'←'})[e.dir],x*T+24,y*T+24,'#bce3c7',15,'sans-serif');else{for(let k=0;k<4;k++)this.rect(x*T+9+k*9,y*T+4,4,36,'#81908d');this.rect(x*T+6,y*T+20,38,5,'#a38e6b');}}
 if(this.target){this.ring(this.target.x*T+24,this.target.y*T+24,10+Math.sin(t*4)*2,'#dec48c88');this.ring(this.target.x*T+24,this.target.y*T+24,3,'#dec48cbb');}
 const actors=d.objects.map(o=>({y:o.y+(o.h||1)-1,draw:()=>this.object(o,t)}));for(const o of SCENERY[s.room]||[])actors.push({y:o.y,draw:()=>this.arch(o.art,o.x*T,(o.y+1-o.h)*T,o.w*T,o.h*T)});actors.push({y:this.py/T,draw:()=>{const x=this.px,y=this.py,bob=moving&&!this.reduced?Math.sin(t*17)*2:0;const facing=s.face[0]<0?2:s.face[0]>0?3:s.face[1]<0?1:0;c.save();c.fillStyle='#0006';c.beginPath();c.ellipse(x+24,y+37,18,7,0,0,7);c.fill();c.restore();this.player(facing,x-3,y-29+bob,54,68);if(g.has('lantern')&&!s.world.lanternAt){this.sprite(8,x+30,y+8+bob,17,23);this.glow(x+38,y+19+bob,35,'#ffcd6744');}}});actors.sort((a,b)=>a.y-b.y).forEach(a=>a.draw());
 shadeRoom(this);drawEffects(this,time);
 // Floating motes give the room life without obscuring the puzzle.
 if(!this.reduced){for(let i=0;i<24;i++){const x=(i*139+Math.sin(t*.25+i)*24)%this.width,y=(i*83-t*(3+i%3)+this.height*100)%this.height;this.rect(x,y,i%4===0?2:1,i%4===0?2:1,`rgba(175,221,183,${.11+Math.sin(t+i)*.09})`);}}
 const vignette=c.createRadialGradient(this.width/2,this.height/2,170,this.width/2,this.height/2,480);vignette.addColorStop(0,'transparent');vignette.addColorStop(1,'#020d1666');c.fillStyle=vignette;c.fillRect(0,0,this.width,this.height);
 for(const p of this.particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.017;p.life-=.022;c.globalAlpha=Math.max(0,p.life);this.rect(p.x,p.y,3,3,p.color)}c.globalAlpha=1;this.particles=this.particles.filter(p=>p.life>0);if(this.flash>0){this.rect(0,0,this.width,this.height,`rgba(197,237,206,${this.flash})`);this.flash*=.93;if(this.flash<.002)this.flash=0;}

 }
 furnishing(index,x,y,w=T,h=w,alpha=1){if(!this.furnitureReady)return;const c=this.ctx,s=this.furniture.width/4;c.save();c.globalAlpha*=alpha;c.drawImage(this.furniture,index%4*s,Math.floor(index/4)*s,s,s,x,y,w,h);c.restore();}
 effect(e){this.effects.push({...e,start:performance.now(),duration:e.type==='pulse'?1100:650});}
 player(index,x,y,w,h){if(this.explorerReady){this.ctx.drawImage(this.explorer,index*128,0,128,160,x,y,w,h);}else{this.sprite(index,x,y,w,h);}}
 object(o,t){const c=this.ctx,g=this.game,s=g.state,w=s.world,x=o.x*T,y=o.y*T,cx=x+(o.w||1)*T/2,cy=y+24;if(toolObject(this,o,t))return;
  if(o.type==='relief'&&w.works.archiveOpen){this.furnishing(1,x-4,y-8,56,56);return;}
  if(o.type==='ornament'){c.save();c.translate(cx,cy);c.rotate(w.works.ornament*Math.PI/2);this.prop(4,-22,-22,44,44);c.restore();if(w.lanternAt==='A1:reader-stand'){c.save();c.strokeStyle=w.works.ornament===2?'#f6da98':'#040d19';c.lineWidth=3;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+(w.works.ornament===2?7:(w.works.ornament-1)*16),cy+56);c.stroke();c.restore();}return;}
  if(o.type==='grate'&&w.works.grateClear){this.arch(15,x,y,48,48,.45);this.furnishing(12,x+28,y-5,32,32);return;}
  if(o.type==='rootmat'){this.sprite(12,x-12,y-10,72,66,w.works.rootsClear?.2:1);return;}
  if(o.type==='lift'){this.furnishing(14,x-6,y+(balanced(s)?-18:9),60,50);if(!g.has('hook'))this.sprite(10,x+8,y+(balanced(s)?-17:10),36,40);return;}
  if(o.type==='tideglass'){if(!g.has('tideglass')){this.prop(9,x-5,y-15,58,64);this.glow(cx,cy,100,'#64e1ff55');}return;}
  if(o.type==='niche'&&o.id==='window-0'&&w.works.tideLit){this.prop(9,x+8,y-5,32,40);this.glow(cx,cy,110,'#68cfe666');return;}
  if(o.propSprite!==undefined){if(o.type==='weighbed')this.prop(3,x,y,48,48,balanced(s)?1:.65);else this.prop(o.propSprite,x-4,y-12,56,60);if(o.type==='mouth'){if(flowing(s))this.glow(cx,cy,40,'#75d9d433');if(g.isLit(o.x,o.y))this.text(['○','□','△'][o.index],cx,y+42,'#f4d99e',19,'sans-serif');}if(o.type==='diverter')this.text(['♧','∪','♪'][w.works.diverter],cx,y+43,'#f2d798',18);return;}
  if(o.archArt!==undefined){this.arch(o.archArt,x,y-10,(o.w||1)*T,T+10,.85);return;}
  if(o.type==='relief'){this.prop(10,x,y-9,48,55,.85);c.save();c.strokeStyle=w.lanternAt==='A1:reader-stand'?'#e6d3a1':'#75867a';c.lineWidth=2;c.beginPath();c.moveTo(x+18,y+31);c.lineTo(x+16,y+19);c.lineTo(x+20,y+23);c.lineTo(x+20,y+11);c.moveTo(x+24,y+25);c.lineTo(x+24,y+9);c.moveTo(x+28,y+25);c.lineTo(x+28,y+11);c.moveTo(x+32,y+25);c.lineTo(x+32,y+15);c.lineTo(x+30,y+31);c.closePath();c.stroke();c.restore();return;}
  if(o.type==='shade'){this.prop(6,x-4,y-12,56,60);return;}
  let sprite=o.furnishing;
  if(o.type==='cabinet')sprite=w.cabinetOpen?1:0;
  if(o.type==='cord')sprite=w.cords[o.index]?2:3;
  if(o.type==='shutter'||o.type==='shade')sprite=w.shadeClosed?4:5;
  if(o.type==='binding'&&w.trellisCut){this.sprite(12,x+4,y+23,37,20,.4);return;}
  if(o.type==='niche'){this.prop(8,x+8,y-5,32,40,.5);return;}
  if(o.type==='inscription'){this.prop(10,x,y-9,48,55,.88);return;}
  if(o.id==='tide-marks'){if(g.isLit(o.x,o.y))['△','□','○'].forEach((a,i)=>{this.rect(x+2,y+7+i*15,44,2,'#a8bbad');this.text(a,cx,y+6+i*15,'#ffe2a1',15,'sans-serif');});return;}
  if(o.type==='mark'){this.rect(x+6,y+23,36,2,'#b2ae8855');this.rect(x+7,y+27,30,1,'#b2ae8833');return;}
  if(o.type==='binding'){this.furnishing(7,x-5,y-18,58,66,.65);this.sprite(12,x-5,y-10,58,58);return;}
  if(sprite!==undefined){const large=o.type==='cabinet',size=large?86:o.type==='cord'?58:o.type==='shutter'?66:58;this.furnishing(sprite,cx-(o.visualWidth||o.w||size/T)*T/2,y+43-(o.visualHeight||size/T)*T,(o.visualWidth||o.w||size/T)*T,(o.visualHeight||size/T)*T,o.screen?.57:1);}
  if(o.id==='ferry-book'&&g.isLit(o.x,o.y))this.text('○ △ □',cx,y+39,'#ffe2a1',15,'sans-serif');
  if(o.type==='cabinet'&&!w.cabinetOpen){w.cords.forEach((up,i)=>{this.rect(x+4+i*32,y+(up?0:15),5,12,up?'#afcdb1':'#e0af64');});this.rect(x+40+(w.shadeClosed?6:0),y+7,4,30,w.shadeClosed?'#809d8c':'#e0af64');}
  if(o.type==='cabinet'&&!g.has('blade'))this.sprite(9,x+8,y-4,32,36,w.cabinetOpen?1:.38);
  if(o.type==='stand'&&w.lanternAt===s.room+':'+o.id){this.sprite(8,x+10,y-9,29,37);this.glow(cx,y+10,120,'#e5b35438');}
  if(o.type==='damper'){this.rect(x+(w.damper?27:14),y+18,4,13,'#bea67a');}
 }
 hitObject(p){const exact=this.game.objectsAt(p.x,p.y).find(o=>this.game.visible(o));if(exact)return exact;return this.game.data.objects.filter(o=>{if(!this.game.visible(o))return false;const size=o.type==='cabinet'?86:58,w=(o.visualWidth||o.w||size/T)*T,h=(o.visualHeight||size/T)*T,cx=o.x*T+(o.w||1)*T/2;return !o.floor&&p.worldX>=cx-w/2&&p.worldX<=cx+w/2&&p.worldY>=o.y*T+43-h&&p.worldY<=o.y*T+43;}).sort((a,b)=>b.y-a.y)[0];}
 arch(index,x,y,w,h,alpha=1){if(!this.architectureReady)return;const bounds=[[10,15,325,410],[345,15,295,410],[740,35,145,385],[1040,195,165,225],[10,460,315,195],[345,480,290,175],[650,510,300,150],[970,510,280,150],[15,700,330,190],[355,730,295,165],[665,705,310,195],[1015,705,225,195],[35,905,260,320],[395,965,185,245],[685,905,230,320],[995,950,235,240]][index];if(!bounds)return;this.ctx.save();this.ctx.globalAlpha*=alpha;this.ctx.drawImage(this.architecture,...bounds,x,y,w,h);this.ctx.restore();}
 ground(tile,x,y,t){const xx=x*T,yy=y*T,c=this.ctx;
 if(tile===' '){this.rect(xx,yy,T+1,T+1,'#09161a');return;}
 if(tile==='O'){this.rect(xx,yy,T+1,T+1,'#071116');this.rect(xx+4,yy,T-8,2,'#304448');this.rect(xx+18,yy,4,T,'#53523a');return;}
 if(tile==='g'){this.rect(xx,yy,T+1,T+1,'#142b28');this.rect(xx+((x*17+y*9)%35),yy+((y*13+x*7)%38),3,6,'#50735835');return;}
 if((tile==='~'||tile==='k')&&this.game.state.room==='W2'&&!flowing(this.game.state)){this.rect(xx,yy,T+1,T+1,'#192d30');this.rect(xx+4,yy+30,T-8,2,'#5b64514d');if(tile==='k')this.rect(xx,yy,T,5,'#70867e');return;}
 if(tile==='~'||tile==='k'){this.sprite(6,xx,yy,T+1,T+1,.65);this.rect(xx,yy,T+1,T+1,'#09293966');if(tile==='k'){this.rect(xx,yy,T,5,'#70867e');this.rect(xx,yy+5,T,3,'#243a3e');}return;}
 this.prop(tile==='s'?14:12,xx,yy,T+1,T+1,.48);this.rect(xx,yy,T+1,T+1,tile==='s'?'#79694a30':tile==='b'?'#76573555':'#26414744');
 if(tile==='b'){for(let k=0;k<4;k++){this.rect(xx+k*12,yy,1,T,'#121a1c88');this.rect(xx+k*12+3,yy+8,1,26,'#ba9b6322');}}
 else{this.rect(xx,yy,T,1,'#0e222a88');this.rect(xx,yy,1,T,'#0e222a88');}
 if(tile==='q'){this.rect(xx+16,yy,16,T,'#0a242b');this.rect(xx+14,yy,2,T,'#79918b');this.rect(xx+33,yy,2,T,'#79918b');const active=this.game.state.world.works.rootsClear&&(this.game.state.room==='W5'||this.game.state.world.works.grateClear);this.rect(xx+22,yy+(active?(t*28+y*7)%36:12),3,12,active?'#9bdaca':'#719c9d55');}
 if(tile==='=')for(let k=0;k<4;k++){this.rect(xx,yy+k*12,T,3,'#87978a88');this.rect(xx,yy+k*12+3,T,3,'#101e23');}
 if(tile==='p')this.rect(xx+2,yy+2,T-4,T-4,'#263028');
 }
 point(event){const b=this.canvas.getBoundingClientRect();const ratio=this.width/this.height;let w=b.width,h=b.height;if(w/h>ratio)w=h*ratio;else h=w/ratio;const x=(event.clientX-b.left-(b.width-w)/2)/w*W,y=(event.clientY-b.top-(b.height-h)/2)/h*H;return{x:Math.floor(x),y:Math.floor(y),worldX:x*T,worldY:y*T};}
}
