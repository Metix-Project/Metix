// define o arquivo de models:
var mysql = require("mysql2");

// declaração das configurações da conexão:
var mySqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// função para executar instruções no database:
function executar(instrucao) {
  // não executa caso o ambiente não tenha sido configurado:
  if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
    return Promise.reject(`AMBIENTE NÃO CONFIGURADO EM ".env"`);
  }

  // retorna uma promessa, pode ser um dado (.then) ou um erro (.catch):
  return new Promise(function (resolve, reject) {
    // define a conexão:
    var conexao = mysql.createConnection(mySqlConfig);
    
    // caso haja algum erro, o erro será retornado:
    conexao.on("error", function (erro) {
      return "ERRO NO MySQL SERVER: ", erro.sqlMessage;
    });
    
    // conecta com o database:
    conexao.connect();

    // executa a instrução:
    conexao.query(instrucao, function (erro, resultados) {
      // fecha a conexão assim que executou:
      conexao.end();

      // caso haja algum erro, rejeita o erro, que pode ser tratado em um `.catch`:
      if (erro) {
        reject(erro);
      }
      // caso contrário, imprime os resultados da instrução:
    //console.log(resultados);
      // e resolve a promessa enviando os resultados, que podem ser tratados em um `.then`:
      resolve(resultados);
    });
  });
}

// exporta para outro arquivo:
module.exports = {
  executar,
};
