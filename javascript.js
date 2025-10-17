const container = document.querySelector("#container");

const input = document.querySelector("#input");
const btnInput = document.querySelector("#btnInput");

const btnRandomColor = document.querySelector("#btnRandomColor");
const btnClear = document.querySelector("#btnClear")
let btnDarkeningEffect = document.querySelector("#btnDarkeningEffect");

let mouseDown = false;
const baseColor = "rgb(40, 43, 185)";
let randomColor = false;
let darkeningEffect = false;


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

btnRandomColor.addEventListener("click", toggleRandomColor);

btnClear.addEventListener("click", clearTable);

btnDarkeningEffect.addEventListener("click", toggleDarkeningEffect);

function applyUserInput() {
    const nbLine = input.value;
    if (nbLine <= 100 && nbLine > 0) {
        delTable();
        createTable(nbLine);
    }

}

function delTable() {
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
    div.style.backgroundColor = baseColor;
    div.style.width = (parseFloat(getComputedStyle(container).width) / nbLine) + "px";

    // for darkening effects
    div.timesPassedOn = 0;
    div.addEventListener("mouseenter", setTrail);
    div.addEventListener("mousedown", setTrail);
    container.appendChild(div);
}

function setTrail(event) {
    let div = event.target;
    if (event.type === "mouseenter") {
        if (mouseDown) {
            div.timesPassedOn += 1;
            div.style.backgroundColor = getColor(div);
        }
    } else if (event.type === "mousedown") {
        div.timesPassedOn += 1;
        div.style.backgroundColor = getColor(div);
    }
}

function getColor(div) {
    let h;
    const s = 70;
    let l;

    if (randomColor) {
        if (darkeningEffect === true) {
            // This if is for avoid changing to another random color when mouse pass on cell and (randomColor + darkeningEffect) are activated
            if(div.timesPassedOn === 1){
                h = Math.floor(Math.random() * 360);
                div.h = h;
            }else{
                h = div.h;
            }

            l = div.timesPassedOn < 10 ? (100 - div.timesPassedOn * 10) : 0;
        } else {
            h = Math.floor(Math.random() * 360);
            l = 50;
        }

    } else {
        h = 126;

        if (darkeningEffect === true) {
            l = div.timesPassedOn < 10 ? (100 - div.timesPassedOn * 10) : 0;
        } else {
            l = 50;
        }

    }

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function toggleRandomColor() {
    randomColor = !randomColor;
    if (randomColor === true) {
        btnRandomColor.textContent = "Random Color : on";
    } else {
        btnRandomColor.textContent = "Random Color : off";
    }
}

function clearTable() {
    const childDivs = container.querySelectorAll("div");
    childDivs.forEach((div) => {
        div.style.backgroundColor = baseColor;
    });
}

function toggleDarkeningEffect() {
    darkeningEffect = !darkeningEffect;
    clearTable();
    if (darkeningEffect === true) {
        btnDarkeningEffect.textContent = "DarkeningEffect : on (Clicking on it will also clear the table)";
    } else {
        btnDarkeningEffect.textContent = "Darkening Effect : off (Clicking on it will also clear the table)";
    }
}