// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function listar(fkEmpresa) {
  // Retorna os usuários da empresa específica
  return database.executar(
    `SELECT * FROM Usuario WHERE fkEmpresa = ${fkEmpresa};`
  );
}

// Buscar o id da Empresa com base no codigoSeguranca
function buscarIdEmpresaPorCodigo(codigoSeguranca) {
  return database.executar(
    `SELECT idEmpresa FROM Empresa WHERE codigoSeguranca = ${codigoSeguranca};`
  );
}

// Cadastro de usuário usando o idEmpresa obtido pelo código de segurança
function cadastrar(nome, email, senha, tel, cpf, cargo, fkEmpresa) {
  return database.executar(
    `INSERT INTO Usuario (nome, email, senha, telefone, cpf, cargo, fkEmpresa) VALUES (${nome}, ${email}, ${senha}, ${tel}, ${cpf}, ${cargo}, ${fkEmpresa});`
  );
}

// Autenticação de usuário considerando o codigoSeguranca
function autenticar(email, senha, codigoSeguranca) {
  return database.executar(
    `SELECT Usuario.*, Empresa.idEmpresa, Empresa.razaoSocial FROM Usuario JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa WHERE Usuario.email = ${email} AND Usuario.senha = ${senha} AND Empresa.codigoSeguranca = ${codigoSeguranca};`
  );
}

// exporta para outro arquivo:
module.exports = {
  listar,
  buscarIdEmpresaPorCodigo,
  cadastrar,
  autenticar
};
