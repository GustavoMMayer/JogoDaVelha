// Dados iniciais
const square = {
    a1:'',    a2:'',    a3:'',
    b1:'',    b2:'',    b3:'',
    c1:'',    c2:'',    c3:''
};
let player='';
let warning ='';
let playng = false;

// Eventos

document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('click',itemClick);
});
/*
document.querySelector('.area').addEventListener('click',itemClick);
*/

//Funções
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playng && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
        color(item,player)
    }

}

function reset (){
warning = '';

let random = Math.floor(Math.random()*2);
player =(random === 0)? 'x': 'o';

for(i in square){
    square[i]='';
    let item = document.querySelector(`div[data-item=${i}]`);
    item.classList.remove('blue');
    item.classList.remove('red');
};
playng=true;

renderSquare();
renderInfo();
};

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
      /* 
        if(square[i] ==='x'){
            item.classList.add('blue');
        }else if(square[i] ==='o'){
            item.classList.add('red');
        }*/
        };

    checkGame();    
};
function color(square, player){
    if ( player==='x'){
        console.log( square, "vai ser azul ",player)
    }else{
        console.log( square, "vai ser vermelho",player)
    }

}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

};
function togglePlayer(){
player=(player==='x')? 'o':'x';
renderInfo();
    
};
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'X é o vitorioso';
        playng = false;
    }else if(checkWinnerFor('o')){
        warning = 'O é o vitorioso';
        playng = false;
    } else if( isFull()){
        warning = "EMPATOU";
        playng = false;
    };
};

function checkWinnerFor(player){
let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
    ];
    for (let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>square[option]===player);
        if (hasWon){
            return true;
        }
    }
    return false;
};
function isFull(){
    for(let i in square){
        if(square[i] ===''){
            return false;
        }
        
    }
    return true;
};
reset();
