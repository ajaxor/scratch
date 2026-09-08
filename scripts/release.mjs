import{createHash}from'node:crypto';
import{readFile,mkdir,writeFile,readdir}from'node:fs/promises';
import{fileURLToPath}from'node:url';
import path from'node:path';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=path.join(root,'dist');
const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
if(!/^\d+\.\d+\.\d+$/.test(pkg.version))throw Error('Use a numeric major.minor.patch version.');
const names=['game.html',...(await readdir(dist)).filter(n=>n.endsWith('.js')||n.endsWith('.css')),...(await readdir(path.join(dist,'assets'))).map(n=>'assets/'+n)].sort();
const files=await Promise.all(names.map(async name=>({name,data:await readFile(path.join(dist,name))})));
// Include all game files and the packaging algorithm. Any change creates a new URL namespace.
const hash=createHash('sha256').update(pkg.version).update(await readFile(fileURLToPath(import.meta.url)));
for(const file of files)hash.update(file.name+'\0').update(file.data).update('\0');
const build=hash.digest('hex').slice(0,16),target=path.join(dist,'releases',build);
for(const file of files){
 let data=file.data,name=file.name;
 if(name==='game.html'){
  name='index.html';data=data.toString().replace('<head>','<head><meta name="hollowmere-build" content="'+build+'">').replaceAll('__RELEASE_VERSION__',pkg.version).replaceAll('__RELEASE_BUILD__',build);
 }
 // Relative imports, CSS and images all stay inside this immutable release directory.
 if(/\.(js|html)$/.test(name))data=data.toString().replace(/\?v=[a-zA-Z0-9.-]+/g,'');
 const output=path.join(target,name);await mkdir(path.dirname(output),{recursive:true});await writeFile(output,data);
}
await writeFile(path.join(dist,'release.json'),JSON.stringify({version:pkg.version,build},null,2)+'\n');
console.log('Hollowmere '+pkg.version+' · '+build);
