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


function createTable() {
    for (let column = 0; column <= 15; column++) {
        for (let line = 0; line <= 15; line++) {
            createDiv(column, line);
        }
    }
}

function createDiv(column, line) {
    let div = document.createElement("div");
    div.textContent = String(16 * column + line);

    // To change color only once when user click
    div.setAttribute("colorChanged", false);
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


const container = document.querySelector("#container");
let mouseDown = false;
createTable();