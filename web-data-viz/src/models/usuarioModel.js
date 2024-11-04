// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function listar(fkEmpresa) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT id, nome, email, fkEmpresa FROM Usuario WHERE fkEmpresa = '${fkEmpresa}';`);
}

function cadastrar(nome, email, senha, tel, cpf, cargo) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`INSERT INTO Usuario (nome, email, senha, telefone, cpf, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tel}', '${cpf}', '${cargo}', 1);`);
}

function autenticar(email, senha) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT * FROM Usuario JOIN Empresa ON fkEmpresa = idEmpresa WHERE emailUsuario = '${email}' AND senha = '${senha}';`);
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  autenticar,
};
