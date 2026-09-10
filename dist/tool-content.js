const item=(id,type,x,y,name,text,extra={})=>({id,type,x,y,name,text,floor:true,...extra});
export const toolDefaults=()=>({lamps:[],cut:[],echoes:[]});
export function addToolPlay(rooms){
 rooms.C1.objects.push(item('found-lantern','lantern-pickup',4,9,'An abandoned lantern','A small flame waits beside a pair of muddy boot prints.'));
 const lamps={H:[[7,7],[12,5]],C1:[[9,9]],C2:[[3,6]],C3:[[11,4]],C4:[[12,7],[14,3]],T1:[[5,5]],A1:[[10,4],[4,7]],W1:[[4,4],[12,8]],W2:[[3,5],[12,9]],W3:[[8,8]],W4:[[7,4],[11,9]],W5:[[10,8]],W6:[[10,5]]};
 for(const[id,points]of Object.entries(lamps))points.forEach(([x,y],i)=>rooms[id].objects.push(item('lamp-'+i,'lamp',x,y,'An oil lamp','Oil darkens the wick.')));
 const vines={H:[[3,6],[12,7]],C1:[[2,5],[5,10],[12,10]],C2:[[2,4],[7,7],[5,9]],C3:[[12,8]],C4:[[3,9],[10,10]],T1:[[3,7]],A1:[[2,6]],W1:[[3,10]],W3:[[13,8]],W4:[[12,7]],W5:[[10,3],[4,8]],W6:[[12,6]]};
 for(const[id,points]of Object.entries(vines))points.forEach(([x,y],i)=>rooms[id].objects.push(item('bramble-'+i,'bramble',x,y,'Tangled growth','Dry tendrils grip the paving.',{floor:false,optional:true})));
 for(const[id,x,y]of[['H',13,7],['C3',12,4],['W4',3,8]])rooms[id].objects.push(item('ivy-window','ivy-window',x,y,'An ivy-covered window','Leaves smother a broken window.'));
 for(const[id,x,y]of[['C2',7,3],['C4',9,10],['T1',13,11]])rooms[id].objects.push(item('parcel','parcel',x,y,'A tied bundle','A weathered cord binds the cloth.'));
 rooms.T1.objects.push(item('lower-anchor','anchor',12,10,'A lower mooring ring','An iron ring is bolted to the flooded landing.'),item('upper-anchor','anchor',12,7,'An upper mooring ring','The high quay has a matching iron ring.'));
 rooms.W2.objects.push(item('well-anchor','anchor',13,6,'A coping ring','A hauling ring spans the dry well.'),item('return-anchor','anchor',3,6,'A western coping ring','Its iron has been polished by a hook.'));
 for(const[id,x,y]of[['H',5,6],['A1',10,9],['W4',12,5],['W6',6,8]])rooms[id].objects.push(item('echo-panel','echo-panel',x,y,'A hollow stone','A shallow seam follows the stone.',{echoOnly:true,optional:true}));
 for(const[id,x,y,glyph]of[['H',10,7,'○'],['C1',5,6,'→'],['A1',8,4,'◇'],['W4',7,9,'○ △ □'],['T1',11,11,'♡']])rooms[id].objects.push(item('light-mark','light-mark',x,y,'A faded mark','A small trace of the people who kept this house.',{lightOnly:true,glyph,optional:true}));
 rooms.W4.objects.find(o=>o.id==='ferry-book').text='Three tide seals repeat beside every safe crossing: circle, triangle, square. The final entry ends: No one left behind.';
 rooms.T1.objects.find(o=>o.id==='tide-marks').text='A circle marks low water; a square the middle stain; a triangle the high causeway.';
 rooms.H.arrival='Cold air reaches the guest hall. Boot prints turn toward the rain porch.';
 rooms.C1.arrival='A small flame waits around the bend. Beyond it, ivy has swallowed the service walk.';
}
// Rectangles lit by the open sky. Everything else needs a real source.
export const SKY={H:[[6,8,10,10]],C1:[[2,0,5,8],[2,8,8,9]],C2:[[0,0,16,12]],C4:[[2,8,10,10]],T1:[[0,7,16,12],[8,2,16,7]],W3:[[2,2,4,4]],W5:[[0,0,16,12]],W6:[[6,1,10,4]]};
