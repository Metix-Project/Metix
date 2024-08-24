// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function listar(fkEmpresa) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT id, razaoSocial, nomeFantasia, email, cnpj, telefone FROM Empresa;`);
}

function cadastrar(razaoSocial, nomeFantasia, email, cnpj, telefone) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`INSERT INTO Usuario (razaoSocial, nomeFantasia, email, cnpj, telefone) VALUES ('${razaoSocial}', '${nomeFantasia}', '${email}', '${cnpj}', '${telefone});`);
}

function buscarPorId(id) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT id, razaoSocial, nomeFantasia, email, cnpj, telefone FROM Empresa where id = ${id};`);
}

function buscarPorCnpj(cnpj) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT id, razaoSocial, nomeFantasia, email, cnpj, telefone FROM Empresa where cnpj = ${cnpj};`);
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  buscarPorId,
  buscarPorCnpj,
};
