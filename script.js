
let grid = document.querySelector(".grid");
let length = 30;
let margin = 1;
let numbers = 20;
let sliderLength = 350;
let percentageArr = Array(numbers).fill().map(x => Array(numbers).fill(0));
let color1 = "red";
let color2 = "blue";
let slider1 = document.getElementById("color1-slider");
let gradient1 = document.getElementById("color1-gradient"); 
let gradient2 = document.getElementById("color2-gradient"); 
let sPicker1 = document.getElementById("spicker1");
let sPicker2 = document.getElementById("spicker2");
let gPicker1 = document.getElementById("gpicker1");
let gPicker2 = document.getElementById("gpicker2");

for(let i = 0 ; i < numbers*numbers ; i++){
    let square= grid.appendChild( document.createElement("div"));
    square.setAttribute("id",`${Math.floor(i/numbers)}-${i%numbers}`);
    square.style.width = length.toString() + "px";
    square.style.height = length.toString() + "px";
    square.style.backgroundColor = color1;
    square.style.margin = margin.toString() + "px";
    square.addEventListener("mouseover", changeSquareColor);
}

grid.style.width = (numbers*length + 2*numbers*margin).toString() + "px";
grid.style.height = (numbers*length + 2*numbers*margin).toString() + "px";

function changeSquareColor(event){
    let x,y;
    [x,y] = event.target.id.split("-").map(Number);
    percentageArr[x][y] = Math.min(percentageArr[x][y]+10,100);
    event.target.style.backgroundColor = `color-mix(in xyz ,${color1},${color2} ${percentageArr[x][y]}%)`;
}

function slider(n,event){
    if(event.buttons % 2 === 0 || event.target.className == "sliderpicker" ){
        return;
    }
    event.stopPropagation();
    let deg = Math.floor(event.offsetX*360/sliderLength);
    if(n === 1){
        gradient1.style.backgroundColor = `hsl( ${deg}deg , 100% , 50%)`;
        sPicker1.style.marginLeft = `${event.offsetX}px`;
    }else{
        gradient2.style.backgroundColor = `hsl( ${deg}deg , 100% , 50%)`;
        sPicker2.style.marginLeft = `${event.offsetX}px`;
    }
}

function gradient(n,event){
    if(event.buttons % 2 === 0 || event.target.className == "gradientpicker"){
        return;
    }
    event.stopPropagation();
    if(n === 1){
        let deg = Math.floor(Number(sPicker1.style.marginLeft.match(/\d+/g))*360/sliderLength);
        color1 = `hsl( ${deg}deg , ${Math.floor(event.offsetX*100/sliderLength)}% , ${100-Math.floor(event.offsetY*100/sliderLength)}% )`;
        gPicker1.style.marginLeft = `${event.offsetX - 5}px`;
        gPicker1.style.marginTop = `${event.offsetY - 5}px`;
        gPicker1.style.backgroundColor = color1;
    }else{
        let deg = Math.floor(Number(sPicker2.style.marginLeft.match(/\d+/g))*360/sliderLength);
        color2 = `hsl( ${deg}deg , ${Math.floor(event.offsetX*100/sliderLength)}% , ${100-Math.floor(event.offsetY*100/sliderLength)}% )`;
        gPicker2.style.marginLeft = `${event.offsetX - 5}px`;
        gPicker2.style.marginTop = `${event.offsetY - 5}px`;
        gPicker2.style.backgroundColor = color2;
    }
    requestAnimationFrame(updateGrid);
}

function updateGrid(){
    for(let x = 0 ; x < numbers ; x++){
        for(let y = 0 ; y < numbers ; y++){
            document.getElementById(`${x}-${y}`).style.backgroundColor =`color-mix(in xyz ,${color1},${color2} ${percentageArr[x][y]}%)`;
        }
    }
}


function reset(){
    for(let x = 0 ; x < numbers ; x++){
        for(let y = 0 ; y < numbers ; y++){
            percentageArr[x][y] = 0;
            document.getElementById(`${x}-${y}`).style.backgroundColor = `color-mix(in srgb,${color1},${color2} 0%)`;
        }
    }
}