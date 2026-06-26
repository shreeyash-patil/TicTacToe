const btn = document.getElementById("btn")
const status = document.querySelector(".status")
const cells = document.querySelectorAll(".cell")

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let blocked = true
let gamestarted = false
let currentplayer = "X"

function cell_click(event){
    const cell = event.target
    
    if(!gamestarted) return;
    if(blocked) return;
    if(cell.textContent) return;
    
    cell.textContent = currentplayer
    
    
    let winner = check_winner();
    if(winner){
        status.textContent = `${winner} Wins!!`
        blocked = true
        return
    }
    
    if(check_draw()){
        status.textContent = "It's a Tie!"
        return
    }

    currentplayer = currentplayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentplayer} Turn`
}

const button_handler = () => {
    if(gamestarted){
        reset() 
    }
    else{
        start()
    }
}

const reset = () => {
    cells.forEach(cell => {
        cell.textContent = "";
    });
    btn.innerHTML = "Start Game"
    status.style.visibility = "hidden";
    
    gamestarted = false
    blocked = true
    currentplayer = "X"
    status.textContent = "Player X Turn"
}

const start = () => {
    cells.forEach(cell => {
        cell.textContent = "";
    });
    btn.innerHTML = "Reset"
    status.style.visibility = "visible";
    gamestarted = true
    blocked = false
    currentplayer = "X"
}

const check_winner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if(cells[a].textContent !== "" && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent){
            return cells[a].textContent;
        }
    }
    return null
}

const check_draw = () => {
    return Array.from(cells).every(cell => cell.textContent !== "");
}

btn.addEventListener("click", button_handler)

cells.forEach(cell => {
    cell.addEventListener("click", (e) => cell_click(e));
});


reset();
