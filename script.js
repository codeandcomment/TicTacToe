const boxes = document.querySelectorAll('.box')
const statusTxt = document.getElementById('status')
const btnRestart = document.getElementById('restart')
let x="<img src='./images/x.png'>"
let o="<img src='./images/o.png'>";


const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let options = ["","","","","","","","",""]

let currentPlayer = x;
let running =false;
let player ="X";
init();
//initilaziation of game
function init(){

    boxes.forEach(box=>box.addEventListener('click',boxClick))
    btnRestart.addEventListener('click',restartGame);
    statusTxt.textContent = `${player} Your Turn`;
    running=true;
}

function boxClick(){
    //clicked box index
    const index = this.dataset.index;
    if(options[index]!='' && !running){
        return true;
    }
    updateBox(this,index);
   
}
function updateBox(box,index){

    if(options[index]!='' || !running){ return true;}
    options[index]=player;
    box.innerHTML = currentPlayer;
     checkWinner();
}


function checkWinner(){
    let isWon =false;

    for(let i=0;i<win.length;i++){
     const condition = win[i];
     const box1 = options[condition[0]];
     const box2 = options[condition[1]];
     const box3 = options[condition[2]];

     if(box1=='' || box2=='' || box3==''){
        continue;
     }

     if(box1==box2 && box2==box3){
        isWon = true
     }

    }
    if(isWon){
        statusTxt.textContent = `${player} Won The Game`;
        running = false;

    }else if(!options.includes("")){
        statusTxt.textContent = `Game Drawn`;
        running = false;
    }else{
        changePlayer()
    }
} 

function changePlayer(){
    player = (player == 'X') ? 'O': 'X'
    currentPlayer  = (currentPlayer == x) ? o: x;

    statusTxt.textContent = `${player} Your Turn`;

}

function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer =x;
    player='X';
    running = true;
    statusTxt.textContent=`${player} Your Turn`;

    boxes.forEach(box=>{
        box.innerHTML='';
    })
}