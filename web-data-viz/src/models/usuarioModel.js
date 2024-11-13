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
<<<<<<< HEAD
  return database.executar(
    `SELECT * 
     FROM Usuario 
     JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa 
     WHERE Usuario.email = ? 
       AND Usuario.senha = ? 
       AND Empresa.codigoSeguranca = ?;`, 
    [email, senha, codigoSeguranca]
  );
  }
=======
  return database.executar(`SELECT * FROM Usuario JOIN Empresa ON fkEmpresa = idEmpresa WHERE Usuario.email = '${email}' AND Usuario.senha = '${senha}';`);
}
>>>>>>> b937df818e441b08d12967d328bf419fd6dff299

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  autenticar,
};
