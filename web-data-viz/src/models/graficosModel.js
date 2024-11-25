// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function pegarDados() {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`select * from DadosServidor;`);
}

function DadosKpiCPU(){
  var instrucaosql   = `SELECT cpuPorc AS DadosKpiCPU2 FROM DadosServidor ORDER BY dataHora DESC LIMIT 1;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

async function DadosKpiCPUPicos() {
  var instrucaosql   = ` SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, cpuPorc as picoCPU
FROM DadosServidor
ORDER BY cpuPorc DESC
LIMIT 2;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
  
}

// exporta para outro arquivo:
module.exports = {
  pegarDados,
  DadosKpiCPU,
  DadosKpiCPUPicos
};
  
