
var jogando = false;
var multiplayer = true;

var PEDRA = 1;
var PAPEL = 2;
var TESOURA = 3;

var ws = undefined;

function connect() {
  if ("WebSocket" in window)
   { 
     // Let us open a web socket
     ws = new WebSocket("ws://localhost:4040");
   }
}

function jogoCpu() {
  return Math.floor((Math.random() * 3) + 1);
}

function jogarMultiplayer(jogada) {
   if(ws) {
      ws.send(jogada);
      ws.onmessage = function (evt) {
        jogoAdversario = evt.data;
        printJogada("Other Player","adversario",jogoAdversario);
        if (jogada == jogoAdversario) {
          mostraMensagem("Empate.");
        }
        else {
          if (jogada == PEDRA && jogoAdversario == PAPEL) {
            mostraMensagem("Voce perdeu!");
          }
          else if(jogada == PAPEL && jogoAdversario == TESOURA) {
            mostraMensagem("Voce perdeu!");
          }
          else if(jogada == TESOURA && jogoAdversario == PEDRA) {
            mostraMensagem("Voce perdeu!");
          }
          else {
            mostraMensagem("Voce ganhou!");
          }
        }

        jogando = false;
      };
   }
}

function regraJogo() {
  
}

function printJogada(usuario, campo, idJogada) {
  var descJogada = "";
  if (idJogada == PEDRA) {
    descJogada = "PEDRA";
  }
  else if(idJogada == PAPEL) {
    descJogada = "PAPEL";
  }
  else if(idJogada == TESOURA) {
    descJogada = "TESOURA";
  }

  document.getElementById(campo).innerHTML = usuario + ': ' + descJogada;
}

function mostraMensagem(resultado) {
  document.getElementById("resultado").innerHTML = 'Resultado:' + resultado;
}

function jogarSingle(jogada) {
  var jogoAdversario = jogoCpu();
  printJogada("CPU","adversario",jogoAdversario);

  if (jogada == jogoAdversario) {
    mostraMensagem("Empate.");
  }
  else {
    if (jogada == PEDRA && jogoAdversario == PAPEL) {
      mostraMensagem("Voce perdeu!");
    }
    else if(jogada == PAPEL && jogoAdversario == TESOURA) {
      mostraMensagem("Voce perdeu!");
    }
    else if(jogada == TESOURA && jogoAdversario == PEDRA) {
      mostraMensagem("Voce perdeu!");
    }
    else {
      mostraMensagem("Voce ganhou!");
    }
  }

  jogando = false;
}

function jogar(jogada) {
   if (!jogando) {
     if (multiplayer) {
       printJogada("PLAYER","player",jogada);
       jogarMultiplayer(jogada);
     }
     else {
       jogarSingle(jogada);
     }
   }
  }
  /*
  if (!jogando) {
    jogando = true;
    printJogada("PLAYER","player",jogada);
    var jogoAdversario = jogoCpu();
    printJogada("CPU","adversario",jogoAdversario);

    if (jogada == jogoAdversario) {
      mostraMensagem("Empate.");
    }
    else {
      if (jogada == PEDRA && jogoAdversario == PAPEL) {
        mostraMensagem("Voce perdeu!");
      }
      else if(jogada == PAPEL && jogoAdversario == TESOURA) {
        mostraMensagem("Voce perdeu!");
      }
      else if(jogada == TESOURA && jogoAdversario == PEDRA) {
        mostraMensagem("Voce perdeu!");
      }
      else {
        mostraMensagem("Voce ganhou!");
      }
    }
    jogando = false;
  }
  */
}

connect();
