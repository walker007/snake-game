let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let cobrinha = [{
    x: 8*box,
    y: 8*box,
}];

let direction = 'right';


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


function iniciaJogo () {
    criaCampo();
    criaCobra();
    let snakeX = cobrinha[0].x, snakeY = cobrinha[0].y;
    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakex -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;
    cobrinha.pop();

    newHead =  {
        x: snakeX,
        y: snakeY
    }
    snakeY.unshift(newHead)
}

let jogo = setInterval(iniciaJogo, 100);