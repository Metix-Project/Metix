// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function listar(fkEmpresa) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT idEmpresa, razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa FROM Empresa;`);
}

function cadastrar(razaoSocial, nomeFantasia, email, cnpj, telefone) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`INSERT INTO Empresa (razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa) VALUES ('${razaoSocial}', '${nomeFantasia}', '${email}', '${cnpj}', '${telefone});`);
}

function buscarPorId(id) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT idEmpresa, razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa FROM Empresa where idEmpresa = ${id};`);
}

function buscarPorCnpj(cnpj) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT idEmpresa, razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa FROM Empresa where cnpj = ${cnpj};`);
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  buscarPorId,
  buscarPorCnpj
};
