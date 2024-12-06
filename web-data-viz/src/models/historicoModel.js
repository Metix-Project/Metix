// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function pegarMedias(macAddress, sundayValue, saturdayValue) {
    var instrucaoSql = `
        SELECT * FROM DadosServidorMedia WHERE fkMaquina = '${macAddress}' AND dia >= '${sundayValue}' AND dia <= '${saturdayValue}' ORDER BY dia ASC;
    `;

    return database.executar(instrucaoSql);
}

function pegarMediasSemanais(macAddress, data) {
    var instrucaoSql = `SELECT * FROM ResumoSemanalMedias WHERE fkMaquina = "${macAddress}" AND semana >= "${data}";`;

    return database.executar(instrucaoSql);
}

function pegarUltimos105Dias(macAddress) {
    var instrucaoSql = `SELECT * FROM DadosServidorMedia WHERE TIMESTAMPDIFF(DAY, dia, NOW()) <= 105 AND fkMaquina = '${macAddress}';`;

    return database.executar(instrucaoSql);
}

// exporta para outro arquivo:
module.exports = {
    pegarMedias,
    pegarMediasSemanais,
    pegarUltimos105Dias
};
 