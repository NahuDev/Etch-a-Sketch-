
let grid = document.querySelector(".grid");
let length = 50;
let margin = 10;
let numbers = 5;
let percentageArr = Array(numbers).fill().map(x => Array(numbers).fill(0));
let color1 = "white";
let color2 = "blue";
let slider1 = document.getElementById("color1-slider");
let gradient1 = document.getElementById("color1-gradient"); 
let gradient2 = document.getElementById("color2-gradient"); 
let picker1 = document.getElementById("picker1");
let picker2 = document.getElementById("picker2");
let animating = false;
let requestId = 0;

for(let i = 0 ; i < numbers*numbers ; i++){
    let square= grid.appendChild( document.createElement("div"));
    square.setAttribute("id",`${Math.floor(i/numbers)}-${i%numbers}`);
    square.style.width = length.toString() + "px";
    square.style.height = length.toString() + "px";
    square.style.backgroundColor = color1;
    square.style.margin = "10px";
    square.addEventListener("mouseover", changeSquareColor);
}

grid.style.width = (numbers*length + 2*numbers*margin).toString() + "px";

function changeSquareColor(event){
    let x,y;
    [x,y] = event.target.id.split("-").map(Number);
    percentageArr[x][y] = Math.min(percentageArr[x][y]+10,100);
    event.target.style.backgroundColor = `color-mix(in xyz ,${color1},${color2} ${percentageArr[x][y]}%)`;
}

function slider(n,event){
    event.stopPropagation();
    requestId = requestAnimationFrame( _ => sliderAnimation(n,event.offsetX,event.buttons));
}

function sliderAnimation(n ,x,buttons){
    if(buttons % 2 === 0 || x <= 2){
        return;
    }
    let deg = Math.floor(x*360/400);
    if(n === 1){
        gradient1.style.backgroundColor = `hsl( ${deg}deg , 100% , 50%)`;
        picker1.style.marginLeft = `${x}px`;
    }else{
        gradient2.style.backgroundColor = `hsl( ${deg}deg , 100% , 50%)`;
        picker2.style.marginLeft = `${x}px`;
    }
}

function gradient(n,event){
    if(event.buttons % 2 === 0){
        return;
    }
    if(n === 1){
        console.log(event.offsetX);
        let deg = Math.floor(Number(picker1.style.marginLeft.match(/\d+/g))*360/400);
        color1 = `hsl( ${deg}deg , ${Math.floor(event.offsetX/4)}% , ${100-Math.floor(event.offsetY/4)}% )`;
    }else{
        let deg = Math.floor(Number(picker2.style.marginLeft.match(/\d+/g))*360/400);
        color2 = `hsl( ${deg}deg , ${Math.floor(event.offsetX/4)}% , ${100-Math.floor(event.offsetY/4)}% )`;
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