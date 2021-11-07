let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let score = 0;
const box = 32;
const cobrinha = [ factoryCoordenada() ];
let comida = factoryCoordenada();
let jogo;
let direction = 'ArrowRight';

const direcaoCobrinha = {
    ArrowDown: function() {
        if( direction != 'ArrowUp')
        {
            direction = 'ArrowDown';
        }
    },
    ArrowUp: function() {
        if(direction != 'ArrowDown')
        {
            direction = 'ArrowUp';
        }
    },
    ArrowRight: function() {
        if(direction != 'ArrowLeft')
        {
            direction = 'ArrowRight';
        }
    },
    ArrowLeft: function() {
        if(direction != 'ArrowRight')
        {
            direction = 'ArrowLeft';
        }
    },
};

const moveCobrinha = {
    ArrowDown: function() {
        let [x,y] = getHead();

        if(y > 15 * box)
        {
            return [x,0];
        }

        return [x, y+=box];
    },
    ArrowUp: function() {
        let [x,y] = getHead();

        if(y < 0)
        {
            return [x,16 * box];
        }

        return [x, y-=box];
    },
    ArrowRight: function() {
        let [x,y] = getHead();

        if(x > 15 * box)
        {
            return [0, y];
        }

        return [x+=box, y]
    },
    ArrowLeft: function() {
        let [x,y] = getHead();

        if(x < 0)
        {
            return [16 * box, y];
        }

        return [x-=box, y];
    },
};

function factoryCoordenada(x = null,y = null){
    return {
        x: x != null ? x : Math.floor(Math.random() *15 +1) *box,
        y: y != null ? y : Math.floor(Math.random() *15 +1) *box
    };
}

function criaCampo ()
{
    context.fillStyle = '#2F4F4F';
    context.fillRect(0,0,16*box, 16*box);
}

function criaCobra() {

    for(var i=0; i<cobrinha.length; i++)
    {

        context.fillStyle = '#32CD32';
        context.fillRect(cobrinha[i].x,cobrinha[i].y, box, box);

    }
}

function update(event){
   if(typeof  direcaoCobrinha[event.key] == 'function')
   {
    direcaoCobrinha[event.key]();  
   } 
}

function velocidade (){
 jogo = setInterval(iniciaJogo, 300-(score*10 <= 250 ? score*10 : 260));
}

function desenhacomida() {
    context.fillStyle = '#DC143C';
    context.fillRect(comida.x, comida.y, box, box);
}

function registraPontos(valor){
    const pontosLabel = document.getElementById('pontos');
    pontosLabel.innerHTML = valor;
}

function getHead(){
    return [cobrinha[0].x, cobrinha[0].y];
}

function gameOver(){
    clearInterval(jogo);
    const resposta = confirm("Fim de Jogo\nPressione 'Ok' para reiniciar");

    if(resposta)
    {
        window.location.reload();
    }
}

function verificaFimJogo(){
    for(var i =1; i <cobrinha.length;i++)
    {
        if(getHead()[0] == cobrinha[i].x && getHead()[1] == cobrinha[i].y)
        {
            gameOver();
        }
    }
}

function iniciaJogo () {

    let [snakeX, snakeY] = moveCobrinha[direction]();

    verificaFimJogo();
    criaCampo();
    criaCobra();
    desenhacomida();

   
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

    cobrinha.unshift(factoryCoordenada(snakeX,snakeY));
}

document.addEventListener('keydown', update);
velocidade();