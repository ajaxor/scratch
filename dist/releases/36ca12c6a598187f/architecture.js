// The camera rooms are adjoining pieces of one building.
// Origins share a boundary tile, so courts, gutters and shafts line up at crossings.
export const ORIGINS = { C2:[0,0], C3:[16,0], C1:[0,12], C4:[16,12], H:[0,24], T1:[16,24], A1:[-16,24],W1:[32,24],W2:[48,24],W3:[48,12],W4:[32,12],W5:[32,0],W6:[48,0] };
export const WALKABLE = new Set(['.',':','b','s','=','q','D']);
const empty=()=>Array.from({length:13},()=>Array(17).fill(' '));
const paint=(a,x,y,w,h,t='.')=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)a[yy][xx]=t;};
function courtyard(id,a){if(!['C1','C2','C3','C4'].includes(id))return;const[ox,oy]=ORIGINS[id];for(let y=0;y<13;y++)for(let x=0;x<17;x++){const xx=ox+x,yy=oy+y;if(xx>=8&&xx<=24&&yy>=6&&yy<=19)a[y][x]='g';}}
function finish(a){const b=a.map(r=>[...r]);for(let y=0;y<13;y++)for(let x=0;x<17;x++){if(![' ','g','~'].includes(a[y][x]))continue;if([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>WALKABLE.has(b[y+dy]?.[x+dx]))){a[y][x]=a[y][x]==='g'?'r':a[y][x]==='~'?'k':'#';}}return a;}
const layouts={};
// Guest hall: a processional nave, shallow apsidal hearth, and two unequal side aisles.
{
 const a=empty();paint(a,3,2,10,8,'s');paint(a,5,1,6,1,'s');paint(a,2,4,1,5,'s');paint(a,13,5,2,5,':');paint(a,1,5,2,2,':');paint(a,14,8,2,2,':');paint(a,4,0,2,3,'s');paint(a,6,10,5,1,'s');
 for(const x of[4,11])for(const y of[4,7])a[y][x]='#';layouts.H=finish(a);
}
// Southwest arcade: a sheltered bend beside the same tree seen in the garden.
{
 const a=empty();courtyard('C1',a);paint(a,2,0,4,11,':');paint(a,2,8,15,3,':');paint(a,3,10,4,2,'b');paint(a,4,11,1,2,':');paint(a,8,10,5,2,'b');
 a[3][3]='#';a[6][3]='#';paint(a,6,2,1,5,'r');paint(a,8,7,9,1,'r');paint(a,2,4,1,3,'q');layouts.C1=finish(a);
}
// Northwest beds: staggered terraces and a dry wheel alcove adjoining the workshop.
{
 const a=empty();courtyard('C2',a);paint(a,2,2,13,4,'.');paint(a,4,1,8,1,'.');paint(a,2,6,5,5,'.');paint(a,4,10,2,3,'.');paint(a,7,5,6,4,'.');paint(a,13,2,4,3,'b');
 paint(a,4,3,3,2,'p');paint(a,9,6,3,2,'p');paint(a,3,8,3,1,'q');paint(a,6,6,1,3,'q');paint(a,7,5,2,1,'=');paint(a,12,5,1,4,'r');layouts.C2=finish(a);
}
// Northeast workshop: a window bay and a narrow delivery leg, with court outside.
{
 const a=empty();courtyard('C3',a);paint(a,1,2,13,5,'b');paint(a,4,1,8,1,'b');paint(a,0,3,2,2,'b');paint(a,10,7,5,4,'s');paint(a,12,10,2,3,':');paint(a,11,6,3,1,'=');
 paint(a,6,5,3,1,'b');paint(a,2,6,7,1,'r');layouts.C3=finish(a);
}
// Southeast laundry: two paths around wash troughs, with a trellised drying recess.
{
 const a=empty();courtyard('C4',a);paint(a,11,0,2,9,':');paint(a,2,8,13,3,'s');paint(a,0,9,3,2,':');paint(a,4,5,7,3,':');paint(a,4,6,2,3,'s');paint(a,8,6,3,2,'~');paint(a,8,8,3,1,'q');paint(a,10,10,3,2,'b');
 paint(a,14,2,2,4,'b');paint(a,13,1,1,6,'#');paint(a,14,6,3,1,'#');a[4][13]='.';layouts.C4=finish(a);
}
// River landing: one high causeway above a broad, stepped and inaccessible lower quay.
{
 const a=empty();paint(a,3,2,14,11,'~');paint(a,1,7,7,3,'s');paint(a,0,8,2,2,'s');paint(a,3,3,5,4,'b');paint(a,7,5,3,3,'s');paint(a,9,6,7,2,':');paint(a,7,7,2,2,'=');paint(a,11,10,5,2,'s');layouts.T1=finish(a);
}
// Library entrance: dogleg between shelves opens into an octagonal reading apse.
{
 const a=empty();paint(a,2,5,14,3,'s');paint(a,15,5,2,2,'s');paint(a,4,3,8,6,'b');paint(a,6,2,4,1,'b');paint(a,5,9,6,2,'b');paint(a,2,3,3,3,':');paint(a,10,3,3,3,':');
 paint(a,5,4,1,3,'#');paint(a,11,6,1,3,'#');layouts.A1=finish(a);
}
// The works wrap a connected watercourse, with dry service circulation throughout.
{
 const a=empty();paint(a,1,5,15,5,'~');paint(a,1,2,15,3,'s');paint(a,1,5,3,6,':');paint(a,11,5,5,6,':');paint(a,3,8,10,3,'b');paint(a,8,4,2,5,'=');paint(a,10,0,2,3,':');paint(a,0,6,2,1,':');paint(a,15,4,2,1,':');layouts.W1=finish(a);
}
{
 const a=empty();paint(a,2,2,13,9,':');paint(a,5,5,7,3,'~');paint(a,4,6,9,1,'~');paint(a,6,4,5,1,'k');paint(a,6,8,5,1,'k');paint(a,5,0,2,3,'b');paint(a,0,4,3,1,':');layouts.W2=finish(a);
}
{
 const a=empty();paint(a,2,2,12,9,'s');paint(a,5,3,2,3,'O');paint(a,10,3,2,3,'O');paint(a,3,6,10,3,'b');paint(a,5,10,2,3,':');paint(a,0,8,3,1,':');paint(a,11,0,2,3,':');layouts.W3=finish(a);
}
{
 const a=empty();paint(a,2,2,12,9,'b');paint(a,5,4,1,4,'#');paint(a,10,6,1,3,'#');paint(a,0,3,3,1,':');paint(a,13,8,4,1,':');paint(a,6,0,2,3,':');paint(a,10,10,2,3,':');layouts.W4=finish(a);
}
{
 const a=empty();paint(a,2,2,12,8,'.');paint(a,5,4,3,3,'~');paint(a,9,4,2,3,'q');paint(a,3,3,2,2,'p');paint(a,11,7,2,2,'p');paint(a,6,9,2,4,'=');paint(a,13,5,4,1,':');layouts.W5=finish(a);
}
{
 const a=empty();paint(a,2,4,13,4,':');paint(a,4,2,9,8,'s');paint(a,6,1,5,1,'s');paint(a,6,10,5,1,'s');paint(a,0,5,3,1,':');paint(a,11,9,2,4,'=');layouts.W6=finish(a);
}
// Each connection records its actual threshold; no direction-to-center assumption.
const passages=[
 ['H','N',[4,0],'C1','S',[4,12]],
 ['H','E',[16,8],'T1','W',[0,8]],
 ['H','W',[0,5],'A1','E',[16,5]],
 ['C1','N',[4,0],'C2','S',[4,12]],
 ['C1','E',[16,9],'C4','W',[0,9]],
 ['C2','E',[16,3],'C3','W',[0,3]],
 ['C3','S',[12,12],'C4','N',[12,0]],
 ['T1','E',[16,6],'W1','W',[0,6]],
 ['C4','E',[16,3],'W4','W',[0,3]],
 ['W1','N',[10,0],'W4','S',[10,12]],
 ['W1','E',[16,4],'W2','W',[0,4]],
 ['W2','N',[5,0],'W3','S',[5,12]],
 ['W3','W',[0,8],'W4','E',[16,8]],
 ['W4','N',[6,0],'W5','S',[6,12]],
 ['W5','E',[16,5],'W6','W',[0,5]],
 ['W6','S',[11,12],'W3','N',[11,0]]
];
const directions={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};
export function architecturalExits(id){return passages.flatMap(([a,da,pa,b,db,pb])=>{if(id!==a&&id!==b)return[];const dir=id===a?da:db,at=id===a?pa:pb,[dx,dy]=directions[dir];return[{dir,at,landing:[at[0]-dx,at[1]-dy],to:id===a?b:a}];});}
for(const a of Object.values(layouts))for(let y=0;y<13;y++)for(let x=0;x<17;x++)if((x===0||x===16||y===0||y===12)&&WALKABLE.has(a[y][x]))a[y][x]='#';
for(const id of Object.keys(layouts))for(const e of architecturalExits(id))layouts[id][e.at[1]][e.at[0]]='D';
export const GEOMETRY=Object.fromEntries(Object.entries(layouts).map(([id,a])=>[id,a.map(r=>r.join(''))]));
export const groundAt=(id,x,y)=>GEOMETRY[id]?.[y]?.[x]??' ';
export const SPAWNS={H:[8,9],C1:[4,10],C2:[4,10],C3:[12,10],C4:[12,2],T1:[3,8],A1:[14,5],W1:[2,6],W2:[2,4],W3:[5,10],W4:[3,3],W5:[6,9],W6:[3,5]};
// Larger fixtures have real footprints; ornament is attached to the architecture.
export const SCENERY={
 W1:[{art:9,x:8,y:6,w:2,h:2},{art:3,x:14,y:6,w:1,h:1.2}],
 W2:[{art:10,x:5,y:4,w:3,h:1},{art:10,x:9,y:8,w:3,h:1}],
 W3:[{art:2,x:6,y:5,w:1,h:2},{art:2,x:10,y:5,w:1,h:2}],
 W4:[{art:12,x:5,y:5,w:1,h:2},{art:12,x:5,y:7,w:1,h:2},{art:12,x:10,y:7,w:1,h:2}],
 W5:[{art:4,x:3,y:4,w:2,h:1.8},{art:5,x:11,y:8,w:2,h:1.8}],
 W6:[{art:14,x:7,y:1,w:3,h:2}],
 H:[{art:2,x:4,y:4,w:1,h:2},{art:2,x:11,y:4,w:1,h:2},{art:2,x:4,y:7,w:1,h:2},{art:3,x:11,y:7,w:1,h:1.2}],
 C1:[{art:2,x:3,y:3,w:1,h:2},{art:3,x:3,y:6,w:1,h:1.1}],
 C2:[{art:4,x:4,y:4,w:3,h:1.8},{art:5,x:9,y:7,w:3,h:1.8}],
 C3:[],C4:[{art:6,x:8,y:7,w:3,h:1.6}],
 T1:[{art:9,x:10,y:6,w:4,h:1.2},{art:3,x:12,y:10,w:1,h:1.2}],
 A1:[{art:12,x:5,y:4,w:1,h:2},{art:12,x:5,y:5,w:1,h:2},{art:12,x:5,y:6,w:1,h:2},{art:12,x:11,y:6,w:1,h:2},{art:12,x:11,y:7,w:1,h:2}]
};
