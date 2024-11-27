// define o arquivo de conexão com o database:

var database = require("../database/connection.js");

function pegarDados() {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`select * from DadosServidor;`);
}




function DadosKpiCPU(){
  var instrucaosql   = `SELECT macAddress, ROUND(AVG(cpuPorc), 2) AS mediaUsoCPU
FROM DadosServidor WHERE dataHora >= NOW() - INTERVAL 1 DAY
GROUP BY macAddress;`;

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


function DadosKpiCPUAlertas(){
  var instrucaosql   = `SELECT macAddress, COUNT(*) AS CPUAlerta
FROM DadosServidor WHERE cpuPorc > 85
GROUP BY macAddress;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

function DadosKpiCPUTempoReal(){
  var instrucaosql   = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, cpuPorc AS CPUTempoReal
FROM DadosServidor ORDER BY dataHora DESC LIMIT 5;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

// exporta para outro arquivo:
module.exports = {
  pegarDados,
  DadosKpiCPU,
  DadosKpiCPUPicos,
  DadosKpiCPUAlertas,
  DadosKpiCPUTempoReal

};
  
