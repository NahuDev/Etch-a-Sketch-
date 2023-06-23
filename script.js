
let grid = document.querySelector(".grid");
let length = 50;
let margin = 10;
let numbers = 15;
for(let i = 0 ; i < numbers*numbers ; i++){
    let square= grid.appendChild( document.createElement("div"));
    square.classList.add("block");
    square.style.width = length.toString() + "px";
    square.style.height = length.toString() + "px";
    square.style.backgroundColor = "green";
    square.style.margin = "10px";
    square.addEventListener("mouseover", foo)
}

grid.style.width = (numbers*length + 2*numbers*margin).toString() + "px";

function foo(event){
    let f = event.target.style.filter;
    if(f == ""){
        event.target.style.filter = "brightness(90%)";
    }else{
        event.target.style.filter = `brightness(${Math.max(Number(f.match(/\d+/)) - 10,0)}%)`;
    }
}