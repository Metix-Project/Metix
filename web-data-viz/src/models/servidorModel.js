// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function listar(fkEmpresa) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`SELECT id, macAddress, pontoDeControle, fkEmpresa FROM Sevidor WHERE fkEmpresa = '${fkEmpresa}';`);
}
function cadastrar(macAddres, pontoDeControle, fkEmpresa) {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`INSERT INTO Sevidor (macAddres, pontoDeControle, fkEmpresa) VALUES ('${macAddres}', '${pontoDeControle}', '${fkEmpresa}');`);
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
};
