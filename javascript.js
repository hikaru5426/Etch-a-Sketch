const container = document.querySelector("#container");

const input = document.querySelector("#input");
const btnInput = document.querySelector("#btnInput");

const btnRandomColor = document.querySelector("#btnRandomColor");
const btnClear = document.querySelector("#btnClear")

let mouseDown = false;
const baseColor = "rgb(40, 43, 185)";
let randomColor = false;

document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
        mouseDown = true;
    }
});

document.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
        mouseDown = false;
    }
});

btnInput.addEventListener("click", applyUserInput);

function applyUserInput() {
    const nbLine = input.value;
    if (nbLine <= 100 && nbLine > 0) {
        delTable();
        createTable(nbLine);
    }

}

btnRandomColor.addEventListener("click", toggleRandomColor);

function delTable() {
    const childDivs = container.querySelectorAll("div");
    childDivs.forEach((div) => {
        div.remove();
    });
}

btnClear.addEventListener("click", clearTable);

function createTable(nbLine) {

    for (let column = 0; column <= nbLine - 1; column++) {
        for (let line = 0; line <= nbLine - 1; line++) {
            createDiv(column, line, nbLine);
        }
    }
}

function createDiv(column, line, nbLine) {
    let div = document.createElement("div");
    div.textContent = String(nbLine * column + line);
    div.style.backgroundColor = baseColor;
    div.style.width = (parseFloat(getComputedStyle(container).width) / nbLine) + "px";

    div.addEventListener("mouseenter", setTrail);
    div.addEventListener("mousedown", setTrail);
    container.appendChild(div);
}

function setTrail(event) {
    let div = event.target;
    if (event.type === "mouseenter") {
        if (mouseDown) {
            div.style.backgroundColor = getColor();
        }
    } else if (event.type === "mousedown") {
        div.style.backgroundColor = getColor();
    }
}

function getColor(){
    if (randomColor){
        const h = Math.floor(Math.random()*360);
        const s = 70;
        const l = 50;
        return `hsl(${h}, ${s}%, ${l}%)`;
    } else{
        return "pink";
    }
}

function toggleRandomColor(){
    randomColor = !randomColor
    if (randomColor === true){
        btnRandomColor.textContent = "Random Color : on";
    } else{
        btnRandomColor.textContent = "Random Color : off";
    }
}

function clearTable(){
    const childDivs = container.querySelectorAll("div");
    childDivs.forEach((div) =>{
        div.style.backgroundColor = baseColor;
    });
}