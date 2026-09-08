import assert from'node:assert/strict';
import{readFile,readdir}from'node:fs/promises';
import{createHash}from'node:crypto';
import vm from'node:vm';
const dist=new URL('../dist/',import.meta.url),read=p=>readFile(new URL(p,dist),'utf8');
const release=JSON.parse(await read('release.json')),loader=await read('index.html');
const code=loader.match(/<script>([\s\S]*?)<\/script>/)[1];
const html=await read('releases/'+release.build+'/index.html');
assert(html.includes('Version '+release.version+' · '+release.build));
assert(!html.includes('__RELEASE_'));
// Exercise the real launcher with HTTP responses, without a browser or network.
async function launch(mode='success'){
 const calls=[],status={},retry={},writes=[];
 const context={URL,Date,Math,AbortSignal,location:{href:'https://example.org/scratch/dist/?launch=old',reload(){}},document:{getElementById:id=>id==='retry'?retry:status,open(){},write:html=>writes.push(html),close(){}},fetch:async(url,options)=>{
  calls.push({url:String(url),options});
  if(mode==='offline')throw Error('offline');
  if(calls.length===1)return{ok:true,json:async()=>mode==='invalid'?{version:'1.1.0',build:'../../bad'}:release};
  return{ok:mode!=='missing',text:async()=>mode==='mismatch'?'<html>old game</html>':html};
 }};
 await vm.runInNewContext(code,context);return{calls,status,retry,writes};
}
const success=await launch();assert.equal(success.calls.length,2);assert.equal(success.calls[0].options.cache,'no-store');assert(new URL(success.calls[0].url).searchParams.has('check'));assert(success.calls[1].url.endsWith('/releases/'+release.build+'/index.html'));assert(success.writes[0].includes('<base href="https://example.org/scratch/dist/releases/'+release.build+'/">'));assert(!success.writes[0].includes('?v=cloister'));
for(const mode of['offline','missing','mismatch','invalid']){const result=await launch(mode);assert.equal(result.writes.length,0);assert.equal(result.retry.hidden,false);assert(result.status.textContent.includes('saved journey is safe'));}
// A CSS, module or image change must yield another release path without manual query edits.
const names=['game.html',...(await readdir(dist)).filter(n=>n.endsWith('.js')||n.endsWith('.css')),...(await readdir(new URL('assets/',dist))).map(n=>'assets/'+n)].sort();
const hash=createHash('sha256').update(release.version).update(await readFile(new URL('../scripts/release.mjs',import.meta.url)));
for(const name of names)hash.update(name+'\0').update(await readFile(new URL(name,dist))).update('\0');
assert.equal(hash.digest('hex').slice(0,16),release.build,'Run npm run release after changing any game file');
for(const name of names){const built=name==='game.html'?'index.html':name;const data=await readFile(new URL('releases/'+release.build+'/'+built,dist));assert(data.length>0);if(name.startsWith('assets/'))assert.deepEqual(data,await readFile(new URL(name,dist)));}
console.log('PASS: uncached release discovery, pinned document/assets, displayed build, publishing/network failures, and up-to-date release output.');
