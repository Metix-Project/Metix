var database = require("../database/config")

function cadastrar(razao, fantasia, email, cnpj, telefone
) {
    console.log("ACESSEI O EMPRESAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razao, fantasia, email, cnpj, telefone);

    var instrucaoSql = `
    INSERT INTO Empresa VALUES (default, '${razao}', '${fantasia}', '${email}', '${cnpj}', '${telefone}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
};