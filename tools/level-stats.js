const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=process.argv[2]||path.join(__dirname,'..','app');const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const ctx={CONTENT:{}};ctx.window=ctx;vm.createContext(ctx);
for(const m of html.matchAll(/src="(data\/[^"]+)"/g))vm.runInContext(fs.readFileSync(path.join(dir,m[1]),'utf8'),ctx);
const C=ctx.CONTENT;const mockIds=new Set();
for(const m of C.mocks||[])for(const [t,ids] of Object.entries(m.items))ids.forEach(i=>mockIds.add(t+':'+i));
for(const t of ['ctw','dl','ap','lcr','conv','ann','talk','bas','email','disc','rep','int']){
 const a=C[t],d={};a.forEach(x=>{const k=x.diff??'none';d[k]=(d[k]||0)+1});
 const b1inMock=a.filter(x=>(x.diff===1)&&mockIds.has(t+':'+x.id)).length;
 console.log(t.padEnd(6),a.length,JSON.stringify(d),'B1 dans tests blancs fixes:',b1inMock);
}
console.log('mocks:',(C.mocks||[]).map(m=>m.id+'('+Object.values(m.items).flat().length+')').join(' '));
