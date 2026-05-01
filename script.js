let steps = [];
let current = 0;
let finalData = {};

const splash = document.getElementById("splash");
const finalPage = document.getElementById("finalPage");

// splash
setTimeout(()=>{
    splash.style.opacity="0";
    setTimeout(()=>{
        splash.style.display="none";
        show("inputPage");
    },1000);
},1500);

function show(p){
    document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
    document.getElementById(p).classList.add("active");
}

function start(){

    let fStr = document.getElementById("func").value;
    let x = parseFloat(document.getElementById("x0").value);
    let y = parseFloat(document.getElementById("y0").value);
    let h = parseFloat(document.getElementById("h").value);
    let n = parseInt(document.getElementById("n").value);

    if(!fStr || isNaN(x) || isNaN(y) || isNaN(h) || isNaN(n)){
        document.getElementById("error").innerText="Fill all inputs!";
        return;
    }

    function f(x,y){
        return Function("x","y","return " + fStr)(x,y);
    }

    steps = [];
    current = 0;
    document.getElementById("boxes").innerHTML="";

    for(let i=1;i<=n;i++){

        let k1 = h * f(x,y);
        let k2 = h * f(x + h/2, y + k1/2);
        let k3 = h * f(x + h/2, y + k2/2);
        let k4 = h * f(x + h, y + k3);

        let yNew = y + (k1 + 2*k2 + 2*k3 + k4)/6;

        steps.push(`
        <div class="box">
        <h3>Step ${i}</h3>
        k1 = ${k1.toFixed(4)} <br>
        k2 = ${k2.toFixed(4)} <br>
        k3 = ${k3.toFixed(4)} <br>
        k4 = ${k4.toFixed(4)} <br><br>
        y(${(x+h).toFixed(2)}) = ${yNew.toFixed(4)}
        </div>
        `);

        x = x + h;
        y = yNew;
    }

    finalData = {x,y};

    show("outputPage");
    nextStep();
}

function nextStep(){
    if(current < steps.length){
        document.getElementById("boxes").innerHTML += steps[current];
        current++;
    } else {
        showFinal();
    }
}

function showFinal(){

    document.querySelectorAll(".page").forEach(p=>p.style.display="none");

    finalPage.style.display="block";

    finalPage.innerHTML = `
    <h1>Final Result</h1>

    <p>Final x = ${finalData.x.toFixed(4)}</p>
    <p>Final y = ${finalData.y.toFixed(4)}</p>

    <button onclick="location.reload()">Back</button>
    `;
}