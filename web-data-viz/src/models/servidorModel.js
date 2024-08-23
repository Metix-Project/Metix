var database = require("../database/config")

function cadastrar(macAddres, pontoDeControle, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO Sevidor (macAddres, pontoDeControle, fkEmpresa) VALUES ('${macAddres}', '${pontoDeControle}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
