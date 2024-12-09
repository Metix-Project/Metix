var database = require("../database/connection.js");



// Lista o ranking de alertas por servidor
function listarRanking(macAddress, Periodo) {
 //console.log("macAddress Atual: " + macAddress)
 var instrucaoSQL = `SELECT fkIdServidor AS Servidor, componenteNome AS Componente, motivo AS Motivo, DATE(DataHora) AS Data, COUNT(*) AS Quantidade FROM Alerta WHERE fkIdServidor = "${macAddress}" and 
DataHora >= NOW() - INTERVAL ${Periodo} DAY GROUP BY fkIdServidor, componenteNome, motivo, DATE(DataHora) ORDER BY Quantidade DESC, Data DESC;`

 //console.log("executando a instrução SQL: \n" + instrucaoSQL)
  return database.executar(
    
    instrucaoSQL
  ); 
}

// Lista a quantidade de alertas por servidor, componente e período
function listarQtdPorServidor(periodo, servidor) {
  return database.executar(
    `SELECT fkIdServidor AS Servidor, componenteNome AS Componente, motivo AS Motivo, DATE(DataHora) AS Data, COUNT(*) AS TotalAlertas FROM Alerta WHERE fkIdServidor = "${servidor}" and 
DataHora >= NOW() - INTERVAL ${periodo} DAY GROUP BY fkIdServidor, componenteNome, motivo, DATE(DataHora) ORDER BY TotalAlertas DESC, Data DESC;`
  );
}

function listarServidoresPorPeriodo (periodo){
  return database.executar(
    `SELECT fkIdServidor AS Servidor, componenteNome AS Componente, motivo AS Motivo, DATE(DataHora) AS Data, COUNT(*) AS TotalAlertas FROM Alerta WHERE DataHora >= NOW() - INTERVAL ${periodo} DAY GROUP BY fkIdServidor, componenteNome, motivo, DATE(DataHora) ORDER BY TotalAlertas DESC, Data DESC;`
  )
}

// Lista alertas por estado (ALERTA)
function listarPorEstadoAlerta() {
  return database.executar(
    `SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress, COUNT(*) AS Total FROM Alerta WHERE estadoAtual = 'ALERTA' GROUP BY componenteNome, estadoAtual, fkIdServidor, motivo, DataHora, idAlerta ORDER BY Componente;`
  );
}

// Lista alertas por estado (RISCO)
function listarPorEstadoRisco() {
  return database.executar(
    `SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress, COUNT(*) AS Total FROM Alerta WHERE estadoAtual = 'RISCO' GROUP BY componenteNome, estadoAtual, fkIdServidor, motivo, DataHora, idAlerta ORDER BY Componente;`
);
}

// Lista alertas das últimas 24 horas
function listarUltimas24Horas() {
  return database.executar(
    `SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress FROM Alerta WHERE DataHora >= NOW() - INTERVAL 1 DAY ORDER BY DataHora DESC;`
);
}

// Lista todos os alertas já gerados
function listarTodos() {
  return database.executar(
    `SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress FROM Alerta ORDER BY DataHora DESC;`
  );
}

module.exports = {
  listarRanking,
  listarQtdPorServidor,
  listarServidoresPorPeriodo,
  listarPorEstadoAlerta,
  listarPorEstadoRisco,
  listarUltimas24Horas,
  listarTodos,
};
