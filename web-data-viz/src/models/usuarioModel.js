var database = require("../database/config")

function cadastrar(nome, email, senha, tel, cpf, cargo) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, telefone, cpf, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tel}', '${cpf}', '${cargo}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email, fkEmpresa as empresaId FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
