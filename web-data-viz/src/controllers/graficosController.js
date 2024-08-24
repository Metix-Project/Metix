// define o arquivo de models:
var graficosModel = require("../models/graficosModel.js");

function pegarDados(req, res) {
  // envia os dados para a função `pegarDados` do model:
  graficosModel
    .pegarDados(nome, email, senha, tel, cpf, cargo)
    .then(function (resultado) {
      // retorna o resultado para o then do fetch com um status de sucesso (200-299):
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log("servidorModel.js: ", erro);
      // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
      res.status(500).json(erro);
    });
}

// exporta para outro arquivo:
module.exports = {
  pegarDados,
};
