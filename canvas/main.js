
var posX = 0;
var posY = 0;
var tamanhoQuadrado = 10;

function desenhaQuadrado(posicaoX, posicaoY, tamanho) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(posicaoX, posicaoY);
  posicaoX += tamanho;
  ctx.lineTo(posicaoX, posicaoY);
  posicaoY -= tamanho;
  ctx.lineTo(posicaoX, posicaoY);
  posicaoX -= tamanho;
  ctx.lineTo(posicaoX, posicaoY);
  posicaoY += tamanho;
  ctx.lineTo(posicaoX, posicaoY);
  ctx.stroke();
}

function desenha() {
   posX+=5;
   posY+=5;
   desenhaQuadrado(posX,posY,tamanhoQuadrado);
}

setInterval(desenha, 100);


