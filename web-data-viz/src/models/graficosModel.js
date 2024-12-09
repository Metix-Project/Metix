// define o arquivo de conexão com o database:

// const { DadosKpiRedeTempoReal } = require("../controllers/graficosController.js");
var database = require("../database/connection.js");

function pegarDados() {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`select * from DadosServidor;`);
}


/////////CPU//////////

function DadosKpiCPU(mcAdress) {
  var instrucaosql = `SELECT macAddress, ROUND(AVG(cpuPorc), 2) AS mediaUsoCPU
FROM DadosServidor
WHERE dataHora >= NOW() - INTERVAL 1 DAY AND macAddress = "${mcAdress}";`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

async function DadosKpiCPUPicos(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, cpuPorc as picoCPU
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY cpuPorc DESC
LIMIT 2;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiCPUAlertas(mcAdress) {
  var instrucaosql = `SELECT macAddress, COUNT(*) AS CPUAlerta
FROM DadosServidor
WHERE cpuPorc > 85 AND macAddress = "${mcAdress}"
GROUP BY macAddress;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiCPUTempoReal(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, cpuPorc AS CPUTempoReal
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY dataHora DESC
LIMIT 5;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

/////////Memória RAM//////////

function DadosKpiMemoria(mcAdress) {
  var instrucaosql = `SELECT macAddress, ROUND(AVG(MemoriaPorc), 2) AS mediaUsoMemoria
FROM DadosServidor
WHERE dataHora >= NOW() - INTERVAL 1 DAY AND macAddress = "${mcAdress}"
GROUP BY macAddress;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

async function DadosKpiMemoriaPicos(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, MemoriaPorc as picoMemoria
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY MemoriaPorc DESC
LIMIT 2;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiMemoriaAlertas(mcAdress) {
  var instrucaosql = `SELECT macAddress, COUNT(*) AS MemoriaAlerta1
FROM DadosServidor
WHERE MemoriaPorc > 85 AND macAddress = "${mcAdress}"
GROUP BY macAddress;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiMemoriaTempoReal(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, MemoriaPorc AS MemoriaTempoReal
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY dataHora DESC
LIMIT 5;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

/////////Rede//////////

function DadosKpiRede(mcAdress) {
  var instrucaosql = `SELECT ROUND(AVG(MbpsEnviados), 2) AS mediaUsoRedeEnv,
  ROUND(AVG(MbpsRecebidos), 2) AS mediaUsoRedeRec
FROM DadosServidor
WHERE macAddress = "${mcAdress}";`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiRedePicos(mcAdress) {
  var instrucaosql = `SELECT 'MbpsEnviado' AS Tipo,
  DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME_FORMAT(TIME(dataHora), '%H:%i') AS Hora1,
  MbpsEnviados
FROM DadosServidor
WHERE MbpsEnviados = (SELECT MAX(MbpsEnviados) FROM DadosServidor WHERE macAddress = "${mcAdress}")
UNION ALL
SELECT 'MbpsRecebido' AS Tipo,
DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME_FORMAT(TIME(dataHora), '%H:%i') AS Hora1,
MbpsRecebidos AS picoRedeRec
FROM DadosServidor
WHERE MbpsRecebidos = (SELECT MAX(MbpsRecebidos) FROM DadosServidor WHERE macAddress = "${mcAdress}");`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiRedeAlertas(mcAdress) {
  var instrucaosql = `SELECT COUNT(*) AS RedeAlerta1
FROM DadosServidor
WHERE (MbpsEnviados > 1000 OR MbpsRecebidos > 1000) AND macAddress = "${mcAdress}";`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function GraficoRedeTempoReal(mcAdress) {
  var instrucaosql = `SELECT  
  TIME_FORMAT(enviados.dataHora, '%H:%i') AS Hora1,
  enviados.MbpsEnviados,
  recebidos.MbpsRecebidos
FROM  
  (SELECT dataHora, MbpsEnviados  
   FROM DadosServidor  
   WHERE macAddress = "${mcAdress}"
   ORDER BY dataHora DESC  
   LIMIT 5) AS enviados
LEFT JOIN  
  (SELECT dataHora, MbpsRecebidos  
   FROM DadosServidor  
   WHERE macAddress = "${mcAdress}"
   ORDER BY dataHora DESC  
   LIMIT 5) AS recebidos
ON enviados.dataHora = recebidos.dataHora
ORDER BY enviados.dataHora DESC;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

/////////Latencia//////////

function DadosKpiLatencia(mcAdress) {
  var instrucaosql = `SELECT macAddress, ROUND(AVG(Latencia), 2) AS mediaUsoLatencia
FROM DadosServidor
WHERE dataHora >= NOW() - INTERVAL 1 DAY AND macAddress = "${mcAdress}"
GROUP BY macAddress;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}


async function DadosKpiLatenciaPicos(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, Latencia as picoLatencia
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY Latencia DESC
LIMIT 2;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiLatenciaAlertas(mcAdress) {
  var instrucaosql = `SELECT COUNT(*) AS LatenciaAlerta1
FROM DadosServidor
WHERE Latencia > 100 AND macAddress = "${mcAdress}";`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiLatenciaTempoReal(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, Latencia AS LatenciaTempoReal
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY dataHora DESC
LIMIT 5;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}



function DadosKpiDisco(mcAdress) {
  var instrucaosql = `SELECT macAddress, ROUND(AVG(DiscoPorc), 2) AS mediaUsoDisco
FROM DadosServidor
WHERE dataHora >= NOW() - INTERVAL 1 DAY AND macAddress = "${mcAdress}";`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

async function DadosKpiDiscoPicos(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, DiscoPorc as picoDisco
FROM DadosServidor
WHERE macAddress = "${mcAdress}"
ORDER BY DiscoPorc DESC
LIMIT 2;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}

function DadosKpiDiscoAlertas(mcAdress) {
  var instrucaosql = `SELECT macAddress, COUNT(*) AS DiscoAlerta1
FROM DadosServidor
WHERE DiscoPorc > 85 AND macAddress = "${mcAdress}"
GROUP BY macAddress;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}


function DadosKpiDiscoTempoReal(mcAdress) {
  var instrucaosql = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, DiscoPorc AS espacoUtilizado
FROM DadosServidor
WHERE macAddress = "08979866bdfd"
ORDER BY dataHora DESC
LIMIT 1;`;

//console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql);
}






// exporta para outro arquivo:
module.exports = {
  pegarDados,
  DadosKpiCPU,
  DadosKpiCPUPicos,
  DadosKpiCPUAlertas,
  DadosKpiCPUTempoReal,

  DadosKpiMemoria,
  DadosKpiMemoriaPicos,
  DadosKpiMemoriaAlertas,
  DadosKpiMemoriaTempoReal,

  DadosKpiRede,
  DadosKpiRedePicos,
  DadosKpiRedeAlertas,
  GraficoRedeTempoReal,

  DadosKpiLatencia,
  DadosKpiLatenciaPicos,
  DadosKpiLatenciaAlertas,
  DadosKpiLatenciaTempoReal,

  DadosKpiDisco,
  DadosKpiDiscoPicos,
  DadosKpiDiscoAlertas,
  DadosKpiDiscoTempoReal
};
  
