let steps=[],current=0,data={};

const splash=document.getElementById("splash");
const finalPage=document.getElementById("finalPage");

setTimeout(()=>{
splash.style.opacity="0";
setTimeout(()=>{splash.style.display="none";show("inputPage")},1500);
},1500);

function show(p){
document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
document.getElementById(p).classList.add("active");
}

function start(){

let fStr=func.value;
let a=+a.value,b=+b.value,n=+n.value;

if(n%2!==0){error.innerText="n must be even";return;}

let h=(b-a)/n,sum=0;

function f(x){return Function("x","return "+fStr)(x);}

let table="<table border='1'><tr><th>i</th><th>x</th><th>f(x)</th></tr>";

for(let i=0;i<=n;i++){
let x=a+i*h,fx=f(x);
let m=(i===0||i===n)?1:(i%2?4:2);
sum+=m*fx;
table+=`<tr><td>${i}</td><td>${x.toFixed(2)}</td><td>${fx.toFixed(2)}</td></tr>`;
}

table+="</table>";

let result=(h/3)*sum;

steps=[
`<div class="box">Step1: a=${a}, b=${b}, n=${n}</div>`,
`<div class="box">Step2: h=${h.toFixed(4)}</div>`,
`<div class="box">${table}</div>`,
`<div class="box">Sum=${sum.toFixed(4)}</div>`,
`<div class="box">Final=${result.toFixed(6)}</div>`
];

data={a,b,n,h,sum,result,table};

show("outputPage");
nextStep();
}

function nextStep(){
if(current<steps.length){
boxes.innerHTML+=steps[current++];
}else showFinal();
}

function showFinal(){

document.querySelectorAll(".page").forEach(p=>p.style.display="none");

finalPage.style.display="block";

finalPage.innerHTML=`
<h1>Complete Solution</h1>
<p class="finalText">Result = ${data.result.toFixed(6)}</p>
<button onclick="location.reload()">Back</button>
`;
}