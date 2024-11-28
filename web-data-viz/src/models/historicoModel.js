// define o arquivo de conexão com o database:
var database = require("../database/connection.js");

function pegarMedias(macAddress, data) {
    var instrucaoSql = `
        SELECT * FROM DadosServidorMedia WHERE fkMaquina = '${macAddress}' AND dia >= '${data}' ORDER BY dia ASC;
    `;

    return database.executar(instrucaoSql);
}

// exporta para outro arquivo:
module.exports = {
    pegarMedias,
};
 