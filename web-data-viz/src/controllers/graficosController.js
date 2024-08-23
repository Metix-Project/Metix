var graficosModel = require("../models/graficosModel");

function pegarDados(req, res) {
  // redirecionando para o model:
  graficosModel
    .pegarDados(nome, email, senha, tel, cpf, cargo)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro);
    });
}

// exportando para outro arquivo:
module.exports = {
  pegarDados,
};
