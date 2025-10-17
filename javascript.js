const container = document.querySelector("#container");
const input = document.querySelector("#input");
const btnInput = document.querySelector("#btnInput");

let mouseDown = false;

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


function applyUserInput(){
    const nbLine = input.value;
    delTable();
    createTable(nbLine);
}

function delTable(){
    const childDivs = container.querySelectorAll("div");
    childDivs.forEach((div) => {
        div.remove();
    });
}

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
    div.style.width = (parseFloat(getComputedStyle(container).width) / nbLine) + "px";

    div.addEventListener("mouseenter", setTrail);
    div.addEventListener("mousedown", setTrail);
    container.appendChild(div);
}

function setTrail(event) {
    let div = event.target;
    if (event.type === "mouseenter") {
        if (mouseDown) {
            div.style.backgroundColor = "pink";
        }
    }else if (event.type === "mousedown"){
        div.style.backgroundColor = "green";
    }
}