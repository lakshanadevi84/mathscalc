let steps=[],current=0,data={};

setTimeout(()=>{
splash.style.opacity="0";
setTimeout(()=>{splash.style.display="none";show("inputPage")},1500);
},1500);

function show(p){
document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
document.getElementById(p).classList.add("active");
}

function start(){

let m=matrix.value.trim().split("\n").map(r=>r.split(" ").map(Number));
let x=vector.value.split(" ").map(Number);
let n=+iter.value;

for(let k=1;k<=n;k++){

let y=m.map(r=>r.reduce((s,v,i)=>s+v*x[i],0));
let lambda=Math.max(...y.map(Math.abs));
x=y.map(v=>v/lambda);

steps.push(`<div class="box">Iteration ${k}<br>λ=${lambda.toFixed(4)}<br>${x}</div>`);
}

data={lambda,x};

show("outputPage");
nextStep();
}

function nextStep(){
if(current<steps.length) boxes.innerHTML+=steps[current++];
else showFinal();
}

function showFinal(){
document.body.innerHTML=`
<h1>Final</h1>
<p>Eigenvalue=${data.lambda}</p>
<button onclick="location.reload()">Back</button>`;
}