// define o arquivo de models:
var usuarioModel = require("../models/usuarioModel.js");

function listar(req, res) {
  // armazena os valores do body do fetch:
  var fkEmpresa = req.body.fkEmpresaServer;

  // valida os valores:
  if (nome == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `listar` do model:
    usuarioModel
      .listar(fkEmpresa)
      .then((resultado) => {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log("usuarioModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

function cadastrar(req, res) {
  // armazena os valores do body do fetch:
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var tel = req.body.telefoneServer;
  var cpf = req.body.cpfServer;
  var cargo = req.body.cargoServer;

  // valida os valores:
  if (nome == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else if (tel == undefined) {
    res.status(400).send("Seu tel está indefinido!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está indefinido!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está indefinido!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `cadastrar` do model:
    usuarioModel
      .cadastrar(nome, email, senha, tel, cpf, cargo)
      .then(function (resultado) {
        // retorna o resultado para o then do fetch com um status de sucesso (200-299):
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro);
      });
  }
}

function autenticar(req, res) {
  // armazena os valores do body do fetch:
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // valida os valores:
  if (email == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    // caso tudo esteja validado
    // envia os dados para a função `autenticar` do model:
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        if (resultadoAutenticar.length == 1) {
          // retorna o resultado para o then do fetch com um status de sucesso (200-299):
          res.status(200).json(resultadoAutenticar);
        } else if (resultadoAutenticar.length == 0) {
          // retorna o erro para o then do fetch com um status de erro de cliente (400-499):
          res.status(403).send("Email e/ou senha inválido(s).");
        }
      })
      .catch(function (erro) {
        console.log("usuarioModel.js: ", erro);
        // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
        res.status(500).json(erro);
      });
  }
}

// exporta para outro arquivo:
module.exports = {
  listar,
  cadastrar,
  autenticar,
};
