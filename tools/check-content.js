const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=process.argv[2]||path.join(__dirname,'..','app');
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const files=[...html.matchAll(/src="(data\/[^"]+)"/g)].map(m=>m[1]);
const ctx={CONTENT:{},window:{}};ctx.window=ctx;vm.createContext(ctx);
for(const f of files){
  const p=path.join(dir,f);
  if(!fs.existsSync(p)){console.log('MISSING',f);continue;}
  try{vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});}catch(e){console.log('ERR',f,e.message);}
}
const C=ctx.CONTENT;let bad=0;
for(const [t,arr] of Object.entries(C)){
  if(!Array.isArray(arr)||!arr[0]||!arr[0].id)continue;
  const ids=arr.map(x=>x.id);const dup=ids.filter((x,i)=>ids.indexOf(x)!==i);
  if(dup.length){console.log('DUP',t,dup);bad++;}
  const qs=x=>x.qs||[];
  for(const it of arr)for(const q of qs(it)){
    if(!Array.isArray(q.o)||q.a==null||q.a<0||q.a>=q.o.length){console.log('BADQ',t,it.id);bad++;}
  }
  if(t==='lcr')for(const it of arr)if(!it.o||it.a<0||it.a>=it.o.length){console.log('BADLCR',it.id);bad++;}
}
for(const t of ['ctw','dl','ap','lcr','conv','ann','talk','bas','email','disc','rep','int'])console.log(t,(C[t]||[]).length);
console.log(bad?'PROBLEMS '+bad:'ALL OK');
