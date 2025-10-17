const container = document.querySelector("#container");



function createTable(){
    for(let column = 0; column <= 15; column ++){
        for(let line = 0; line <= 15; line ++){
            createDiv(column, line);
        }
    }
}

function createDiv(column, line){
    let div = document.createElement("div");
        div.textContent = String(16*column+line);
        container.appendChild(div);
}

createTable();