// define o arquivo de conexão com o database:

const { DadosKpiRedeTempoReal } = require("../controllers/graficosController.js");
var database = require("../database/connection.js");

function pegarDados() {
  // retorna a resposta do banco de dados para o controller:
  return database.executar(`select * from DadosServidor;`);
}


/////////CPU//////////

function DadosKpiCPU(mcAdress){
  var instrucaosql   = `SELECT macAddress, ROUND(AVG(cpuPorc), 2) AS mediaUsoCPU
FROM DadosServidor WHERE dataHora >= NOW() - INTERVAL 1 DAY
WHERE macAddress = "${mcAdress}";`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

async function DadosKpiCPUPicos(mcAdress) {
  var instrucaosql   = ` SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, cpuPorc as picoCPU
FROM DadosServidor
where macAddress = '${mcAdress}'
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

/////////Memória RAM//////////
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

function DadosKpiMemoria(){
  var instrucaosql   = `SELECT macAddress, ROUND(AVG(MemoriaPorc), 2) AS mediaUsoMemoria
FROM DadosServidor WHERE dataHora >= NOW() - INTERVAL 1 DAY
GROUP BY macAddress;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

async function DadosKpiMemoriaPicos() {
  var instrucaosql   = ` SELECT DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME(dataHora) AS Hora1, MemoriaPorc as picoMemoria
FROM DadosServidor ORDER BY MemoriaPorc DESC LIMIT 2;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
  
}

function DadosKpiMemoriaAlertas(){
  var instrucaosql   = `SELECT macAddress, COUNT(*) AS MemoriaAlerta1
FROM DadosServidor WHERE MemoriaPorc > 85
GROUP BY macAddress;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

function DadosKpiMemoriaTempoReal(){
  var instrucaosql   = `SELECT DATE_FORMAT(dataHora, '%H:%i') AS hora, MemoriaPorc AS MemoriaTempoReal
FROM DadosServidor ORDER BY dataHora DESC LIMIT 5;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}

function DadosKpiRede(){
  var instrucaosql   = `SELECT ROUND(AVG(MbpsEnviados), 2) AS mediaUsoRedeEnv,
    ROUND(AVG(MbpsRecebidos), 2) AS mediaUsoRedeRec FROM DadosServidor;`;

  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}


function DadosKpiRedePicos() {
  var instrucaosql   = `SELECT 'MbpsEnviado' AS Tipo,
    DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME_FORMAT(TIME(dataHora), '%H:%i') AS Hora1,
    MbpsEnviados FROM DadosServidor WHERE MbpsEnviados = (SELECT MAX(MbpsEnviados) FROM DadosServidor)
UNION ALL
SELECT 'MbpsRecebido' AS Tipo,
DATE_FORMAT(dataHora, '%d/%m/%Y') AS Data1, TIME_FORMAT(TIME(dataHora), '%H:%i') AS Hora1,
MbpsRecebidos AS picoRedeRec FROM DadosServidor WHERE MbpsRecebidos = (SELECT MAX(MbpsRecebidos) FROM DadosServidor);
`;
  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}


function DadosKpiRedeAlertas() {
  var instrucaosql   = `SELECT COUNT(*) AS RedeAlerta1
FROM DadosServidor WHERE MbpsEnviados > 1000 OR MbpsRecebidos > 1000;
`;
  console.log("Executando Query \n" + instrucaosql);
  return database.executar(instrucaosql)
}



function GraficoRedeTempoReal() {
  var instrucaosql = `SELECT  
    TIME_FORMAT(enviados.dataHora, '%H:%i') AS Hora1,
    enviados.MbpsEnviados,
    recebidos.MbpsRecebidos
FROM  
    (SELECT dataHora, MbpsEnviados  
     FROM DadosServidor  
     ORDER BY dataHora DESC  
     LIMIT 5) AS enviados
LEFT JOIN  
    (SELECT dataHora, MbpsRecebidos  
     FROM DadosServidor  
     ORDER BY dataHora DESC  
     LIMIT 5) AS recebidos
ON enviados.dataHora = recebidos.dataHora
ORDER BY enviados.dataHora DESC; 

`;

  console.log("Executando Query \n" + instrucaosql);
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
  GraficoRedeTempoReal



};
  
