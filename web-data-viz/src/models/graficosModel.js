var database = require("../database/config");

function pegarDados() {
  return database.executar(`select * from DadosServidor;`);
}

module.exports = {
  pegarDados,
};
