f=x=>~~(x/3)-2
g=x=>(r=f(x))>0&&r+g(r)
w=require('fs').readFileSync('1','utf8')
q=z=>console.log(w.split`
`.reduce((a,v)=>a+z(v),0))
q(f)
q(g)
