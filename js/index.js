let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
const box = 32;
const cobrinha = [
    factoryCoordenada()
];
let comida = factoryCoordenada();
let jogo;
let direction = 'right';
const moveCobrinha = {
    ArrowDown: function() {
        if( direction != 'up')
        {
            direction = 'down';
        }
    },
    ArrowUp: function() {
        if(direction != 'down')
        {
            direction = 'up';
        }
    },
    ArrowRight: function() {
        if(direction != 'left')
        {
            direction = 'right';
        }
    },
    ArrowLeft: function() {
        if(direction != 'right')
        {
            direction = 'left';
        }
    },
};
let score = 0;

function factoryCoordenada(){
    return {
        x: Math.floor(Math.random() *15 +1) *box,
        y: Math.floor(Math.random() *15 +1) *box
    };
}

function criaCampo ()
{
    context.fillStyle = '#000';
    context.fillRect(0,0,16*box, 16*box);
}

function criaCobra() {
    for(var i=0; i<cobrinha.length; i++)
    {

        context.fillStyle = 'green';
        context.fillRect(cobrinha[i].x,cobrinha[i].y, box, box);
    }
}

document.addEventListener('keydown', update);

function update(event){
   if(typeof  moveCobrinha[event.key] == 'function')
   {
    moveCobrinha[event.key]();  
   } 
}

function velocidade (){
 jogo = setInterval(iniciaJogo, 400-(score*10));
}

function desenhacomida() {
    context.fillStyle = 'red';
    context.fillRect(comida.x, comida.y, box, box);
}

function registraPontos(valor){
    const pontosLabel = document.getElementById('pontos');
    pontosLabel.innerHTML = valor;
}

function iniciaJogo () {


    if(cobrinha[0].x > 15 *box && direction=='right')cobrinha[0].x=0;
    if(cobrinha[0].x <0 *box && direction=='left')cobrinha[0].x=16*box;
    if(cobrinha[0].y > 15 *box && direction=='down')cobrinha[0].y=0;
    if(cobrinha[0].y <0 *box && direction=='up')cobrinha[0].y=16*box;

    for(var i =1; i <cobrinha.length;i++)
    {
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y)
        {
            clearInterval(jogo);
            alert("Fim de Jogo\nPerssione F5 para reiniciar");
        }
    }

    criaCampo();
    criaCobra();
    desenhacomida();

    let snakeX = cobrinha[0].x,
    snakeY = cobrinha[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y)
    {
        cobrinha.pop();
    }else{
        comida = factoryCoordenada();
        score++;
        registraPontos(score);
        clearInterval(jogo);
        velocidade();
    }

    newHead = {
        x: snakeX,
        y: snakeY
    };

    cobrinha.unshift(newHead)
}

velocidade();