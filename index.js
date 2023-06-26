const board = document.querySelector(".board");
const reset_btn = document.querySelector("#reset-btn");
class Player {
    constructor(symbol,turn) {
        this.symbol=symbol;
        this.turn=turn;
    }
}
let counter=0;

function createBoard(){
    for(let i=0;i<9;i++) {
        const btn = document.createElement("button");
        btn.id=i;
        btn.className="board-btn";
        board.appendChild(btn);
    }      
}

createBoard();

const player_x=new Player("X",true);
const player_o=new Player("O",false);

const btns=document.querySelectorAll(".board-btn");
btns.forEach(btn => {
    btn.addEventListener('click', (e)=>handleClick(e.target))
});

function handleClick(btn) {
    counter++;
    if(player_x.turn) {
        btn.innerText="X";
        btn.disabled=true;
        player_x.turn=false;
        player_o.turn=true;
    }
    else {
        btn.innerText="O";
        btn.disabled=true;
        player_x.turn=true;
        player_o.turn=false;
    }
    if(counter>=5)
        win();
    if(counter==9)
        setTimeout(() => {alert("It's a tie!");}, 100);
}

function win() {
    const winning_combos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let combo of winning_combos) {
        const [a,b,c]=combo;
        const btnA=btns[a];
        const btnB=btns[b];
        const btnC=btns[c];

        if(btnA.innerText==btnB.innerText && btnB.innerText==btnC.innerText && btnA.innerText!="")
            {
                if(btnA.innerText=="X")
                    setTimeout(() => {alert(`Player ${player_x.symbol} wins!`);}, 100);
                else
                    setTimeout(() => {alert(`Player ${player_o.symbol} wins!`);}, 100);
                counter=0;
            }   
    }
}

reset_btn.addEventListener('click', resetBoard);

function resetBoard() {
    counter=0;
    player_x.turn=true;
    player_o.turn=false;
    btns.forEach(btn=>{
        btn.innerText="";
        btn.disabled=false;
    })
}