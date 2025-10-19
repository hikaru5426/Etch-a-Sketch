const container = document.querySelector("#container");

const input = document.querySelector("#input");
const btnInput = document.querySelector("#btnInput");

const inputColor = document.querySelector("#colorPicker");
let chosenColorText = document.querySelector("#chosenColorText");
const btnRandomColor = document.querySelector("#btnRandomColor");
const btnClear = document.querySelector("#btnClear");
const btnDarkeningEffect = document.querySelector("#btnDarkeningEffect");

let mouseDown = false;
const baseColor = "hsl(0, 0%, 100%)";
let color = hexToHsl(inputColor.value);
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

inputColor.addEventListener("input", changeColor);

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
    // to show cells number
    // div.textContent = String(nbLine * column + line);
    div.style.backgroundColor = baseColor;
    div.style.width = (parseFloat(getComputedStyle(container).width) / nbLine) + "px";

    // these values because a new div is white
    div.h = 0;
    div.s = 0;
    div.l = 100;

    div.addEventListener("mouseenter", setTrail);
    div.addEventListener("mousedown", setTrail);
    container.appendChild(div);
}

function setTrail(event) {
    let div = event.target;
    if (event.type === "mouseenter") {
        if (mouseDown) {
            div.style.backgroundColor = getColor(div);
        }
    } else if (event.type === "mousedown") {
        div.style.backgroundColor = getColor(div);
    }
}

function getColor(div) {
    // x = ancient x
    let h = div.h;
    let s = div.s;
    let l = div.l;
// ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    if (randomColor) {
        if (darkeningEffect === true) {
            l = l > 10 ? (l - 10) : 0;
        } else {
            h = Math.floor(Math.random() * 360);
            s = 70;
            l = 50;
        }

    } else {
        if (darkeningEffect === true) {
            l = l > 10 ? (l - 10) : 0;
            
        }else{
            h = parseFloat(color.match(/\d+/)[0]);
            s = parseFloat(color.match(/\d+/g)[1]);
            l = parseFloat(color.match(/\d+/g)[2]);
        }

    }

    div.h = h;
    div.s = s;
    div.l = l;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function changeColor(event) {
    // newColor is HEX format
    let newColor = event.target.value;
    if (randomColor) {
        toggleRandomColor(true);
    }
    if (darkeningEffect) {
        toggleDarkeningEffect(true);
    }
    color = hexToHsl(newColor);
    chosenColorText.textContent = color;
}

function hexToHsl(hexColor) {

    // Hex to RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h;
    let s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // gray
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
    }

    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function toggleRandomColor() {
    if (darkeningEffect){
        toggleDarkeningEffect();
    }
    randomColor = !randomColor;
    if (randomColor === true) {
        btnRandomColor.textContent = "Random Color : on";
        chosenColorText.textContent = "Random";
    } else {
        btnRandomColor.textContent = "Random Color : off";
    }    
}

function clearTable() {
    const childDivs = container.querySelectorAll("div");
    childDivs.forEach((div) => {
        div.style.backgroundColor = baseColor;
        div.h = 0;
        div.s = 0;
        div.l = 100;
    });
}

function toggleDarkeningEffect() {
    if(randomColor){
        toggleRandomColor();
    }
    darkeningEffect = !darkeningEffect;
    if (darkeningEffect === true) {
        btnDarkeningEffect.textContent = "Darkening Effect : on";
        chosenColorText.textContent = "Darkening Effect";
    } else {
        btnDarkeningEffect.textContent = "Darkening Effect : off";
    }
}