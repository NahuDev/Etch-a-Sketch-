
let grid = document.querySelector(".grid");
let currentNumber = Number(document.querySelector("input").value);
let max = Number(document.querySelector("input").max);
let gridSize = 700;
let sliderLength = 350;
let squareLength = Math.floor(gridSize/currentNumber);
let percentageArr = Array(max).fill().map(_ => Array(max).fill(0));
let color1 = "red";
let color2 = "blue";
let slider1 = document.getElementById("color1-slider");
let gradient1 = document.getElementById("color1-gradient"); 
let gradient2 = document.getElementById("color2-gradient"); 
let sPicker1 = document.getElementById("spicker1");
let sPicker2 = document.getElementById("spicker2");
let gPicker1 = document.getElementById("gpicker1");
let gPicker2 = document.getElementById("gpicker2");
let rainbowBool = false;
let isHoverGrid = false;
grid.style.width = gridSize.toString() + "px";
grid.style.height = gridSize.toString() + "px";
document.addEventListener("contextmenu", e => e.preventDefault(), false);


for(let x = 0 ; x < max; x++){
    for(let y = 0 ; y < max ; y++ ){
        let square = grid.appendChild( document.createElement("div"));
        square.setAttribute("id",`${x}-${y}`);
        square.style.width = `${100/currentNumber}%`;
        square.style.height = `${100/currentNumber}%`;
        square.style.backgroundColor = color1;
        square.style.margin = "0";
        square.style.display = x >= currentNumber || y >= currentNumber ? "none" : "inline";
        square.addEventListener("mouseover", changeSquareColor);
        square.addEventListener("mousedown" , changeSquareColor);
    }
}

grid.addEventListener("mouseover", _ => isHoverGrid = true );
grid.addEventListener("mouseout", _ => isHoverGrid = false );


function resizeGrid(n){
    if(n == currentNumber){
        return;
    }
    if(n < currentNumber){
    for(let x = n; x < currentNumber; x++){
        for(let y = 0 ; y <  currentNumber; y++){
                document.getElementById(`${x}-${y}`).style.display = "none";
            }
        }
        for(let x = 0; x < currentNumber; x++){
            for(let y = n; y <  currentNumber; y++){
                document.getElementById(`${x}-${y}`).style.display = "none";
            }
        }
    }else{
        for(let x = currentNumber-1; x < n; x++){
            for(let y = 0 ; y <  n; y++){
                document.getElementById(`${x}-${y}`).style.display = "inline";
                if(!rainbowBool){
                    document.getElementById(`${x}-${y}`).style.backgroundColor = `color-mix(in srgb ,${color1},${color2} ${percentageArr[x][y]}%)`;
                }
            }
        }
        for(let x = 0 ; x < n ; x++){
            for(let y = currentNumber-1; y <  n; y++){
                document.getElementById(`${x}-${y}`).style.display = "inline";
                if(!rainbowBool){
                    document.getElementById(`${x}-${y}`).style.backgroundColor = `color-mix(in srgb ,${color1},${color2} ${percentageArr[x][y]}%)`;
                }
            }
        }
    }
    currentNumber = n;
    let per = 100/currentNumber;
    squareLength = Math.floor(gridSize/currentNumber);
    for(let x = 0 ; x < currentNumber ; x++){
        for(let y = 0 ; y < currentNumber ; y++){
            square = document.getElementById(`${x}-${y}`);
            square.style.width = `${per}%`;
            square.style.height = `${per}%`;
        }
    }
}

function changeSquareColor(event){
    
    let x,y;
    [x,y] = event.target.id.split("-").map(Number);
    if(rainbowBool){
        event.target.style.backgroundColor = `hsl( ${Math.floor(Math.random()*360)}deg , 100% , 50%)`
    }else{
        if(event.buttons % 2){
            percentageArr[x][y] = Math.min(percentageArr[x][y]+10,100);
            event.target.style.backgroundColor = `color-mix(in srgb ,${color1},${color2} ${percentageArr[x][y]}%)`;
        }else if(Math.floor(event.buttons/2) % 2){
            percentageArr[x][y] = Math.max(percentageArr[x][y]-10,0);
            event.target.style.backgroundColor = `color-mix(in srgb ,${color1},${color2} ${percentageArr[x][y]}%)`;
        }
    }
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
    if(!rainbowBool){
        requestAnimationFrame(updateGrid);
    }
}

function updateGrid(){
    for(let x = 0 ; x < currentNumber; x++){
        for(let y = 0 ; y < currentNumber; y++){
            document.getElementById(`${x}-${y}`).style.backgroundColor =`color-mix(in xyz ,${color1},${color2} ${percentageArr[x][y]}%)`;
        }
    }
}


function reset(){
    for(let x = 0 ; x < max; x++){
        for(let y = 0 ; y < max; y++){
            percentageArr[x][y] = 0;
            document.getElementById(`${x}-${y}`).style.backgroundColor = `color-mix(in srgb,${color1},${color2} 0%)`;
        }
    }
}

function rainbow(){
    rainbowBool = !rainbowBool;
    rainbowButton = document.getElementById("button-rainbow");
    if(rainbowBool){
        rainbowButton.style.backgroundColor = "white";
    }else{
        rainbowButton.style.backgroundColor = "gray";
    }
}
