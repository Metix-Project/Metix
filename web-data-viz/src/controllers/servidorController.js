// define o arquivo de models:
var servidorModel = require("../models/servidorModel.js");

function listar(req, res) {
  // armazena os valores do body do fetch:
  var fkEmpresa = req.body.fkEmpresaServer;

  // valida os valores:
  if (nome == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `listar` do model:
    servidorModel
      .listar(fkEmpresa)
      .then((resultado) => {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
      //console.log("servidorModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

function cadastrar(req, res) {
  // armazena os valores do body do fetch:
  var macAddres = req.body.macAddresServer;
  var pontoDeControle = req.body.pontoDeControleServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // valida os valores:
  if (macAddres == undefined) {
    res.status(400).send("Seu macAddres está indefinido!");
  } else if (pontoDeControle == undefined) {
    res.status(400).send("Seu pontoDeControle está indefinido!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua fkEmpresa está indefinida!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `cadastrar` do model:
    servidorModel
      .cadastrar(macAddres, pontoDeControle, fkEmpresa)
      .then(function (resultado) {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
      //console.log("servidorModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
};
