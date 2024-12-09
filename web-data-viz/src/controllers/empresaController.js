// define o arquivo de models:
var empresaModel = require("../models/empresaModel.js");

function listar(req, res) {
  // envia os dados para a função `listar` do model:
  empresaModel
    .listar()
    .then((resultado) => {
      // retorna o resultado para o then do fetch com um status de sucesso (200-299):
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
    //console.log("empresaModel.js: ", erro);
      // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
      res.status(500).json(erro);
    });
}

function cadastrar(req, res) {
  // armazena os valores do body do fetch:
  var razao = req.body.razaoServer;
  var fantasia = req.body.fantasiaServer;
  var email = req.body.emailServer;
  var cnpj = req.body.cnpjServer;
  var telefone = req.body.telefoneServer;

  // valida os valores:
  if (razao == undefined) {
    res.status(400).send("Sua razão está indefinida!");
  } else if ((fantasia = undefined)) {
    fantasia = "";
  } else if (email == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está indefinido!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `cadastrar` do model:
    empresaModel
      .cadastrar(razao, fantasia, email, cnpj, telefone)
      .then((resultado) => {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
      //console.log("empresaModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

function buscarPorId(req, res) {
  // armazena o valor do parâmetro do fetch:
  var id = req.params.id;

  // valida os valores:
  if (id == undefined) {
    res.status(400).send("Seu id está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `buscarPorId` do model:
    empresaModel
      .buscarPorId(id)
      .then((resultado) => {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
      //console.log("empresaModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

function buscarPorCnpj(req, res) {
  // armazena o valor da query do fetch:
  var cnpj = req.query.cnpj;

  // valida os valores:
  if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `buscarPorCnpj` do model:
    empresaModel
      .buscarPorCnpj(cnpj)
      .then((resultado) => {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
      //console.log("empresaModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  buscarPorId,
  buscarPorCnpj,
};

/*
             razaoServer: razaoVar,
            fantasiaServer: fantasiaVar,
            emailServer: emailVar,
            cnpjServer: cnpjVar,
            telefoneServer: telefoneVar,
 */
