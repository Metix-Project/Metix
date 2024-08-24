// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function pegarDados() {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`select * from DadosServidor;`);
}

// exporta para outro arquivo:
module.exports = {
  pegarDados,
};
