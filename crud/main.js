

function guardaNoLocalStorage(key, objeto) {
  var objetoString = JSON.stringify(objeto);
  localStorage.setItem(key, objetoString);
}

function recuperaDoLocalStorage(key) {
  var objeto = localStorage.getItem(key);
  if (!objeto || objeto==null) {
    return undefined;
  }
  return JSON.parse(objeto);
}

function getNextID() {
  var pessoaAutoIncrement = recuperaDoLocalStorage("pessoa_autoinc");
  if (!pessoaAutoIncrement) {
    guardaNoLocalStorage("pessoa_autoinc",0);
  }
  pessoaAutoIncrement = recuperaDoLocalStorage("pessoa_autoinc");
  pessoaAutoIncrement++;
  guardaNoLocalStorage("pessoa_autoinc",pessoaAutoIncrement);
  return pessoaAutoIncrement;
}

function mostraGrid() {
  var pessoas = recuperaDoLocalStorage("pessoas");
  if (pessoas) {
    var grid = document.getElementById("grid");
    var conteudoGrid = '<tr>';
    conteudoGrid += '<th>ID</th> <th>NOME</th> <th>#</th>';
    conteudoGrid += '</tr>';

    for (var indice in pessoas) {
      var pessoa = pessoas[indice];
      conteudoGrid += '<tr>';
      conteudoGrid += '<td>';
      conteudoGrid += pessoa.id;
      conteudoGrid += '</td>';
      conteudoGrid += '<td>';
      conteudoGrid += pessoa.nome;
      conteudoGrid += '</td>';
      conteudoGrid += '<td>';
      conteudoGrid += '<a href="javascript:visualizar('+pessoa.id+')">visualizar</a>';
      conteudoGrid += '</td>';
      conteudoGrid += '</tr>';
    }

    grid.innerHTML = conteudoGrid;
  }
}

function limpar() {
  document.getElementById("id").value = "";
  document.getElementById("nome").value = "";
}

function adicionar() {
  var pessoas = recuperaDoLocalStorage("pessoas");
  if (!pessoas) {
    pessoas = [];
  }
  var pessoa = {
    id:undefined,
    nome:''
  };
  var nomePessoa = document.getElementById("nome").value;
  pessoa.id = getNextID();
  pessoa.nome = nomePessoa;
  pessoas.push(pessoa);
  guardaNoLocalStorage("pessoas",pessoas);
  limpar();
  mostraGrid();
}

function load(id) {
  var pessoas = recuperaDoLocalStorage("pessoas");
  if (pessoas && pessoas.length > 0) {
    for (var i=0;i<pessoas.length;i++) {
      var pessoa = pessoas[i];
      if (pessoa.id == id) {
        return pessoa;
      }
    }
  }
  return undefined;
}

function visualizar(id) {
  var pessoa = load(id);
  if (pessoa) {
    document.getElementById("id").value = pessoa.id;
    document.getElementById("nome").value = pessoa.nome;
  }
}

mostraGrid();

