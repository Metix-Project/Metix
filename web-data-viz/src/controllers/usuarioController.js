var usuarioModel = require("../models/usuarioModel.js");

function listar(req, res) {
  var fkEmpresa = req.body.fkEmpresaServer;

  if (fkEmpresa == undefined) {
    res.status(400).send("A empresa está indefinida!");
  } else {
    usuarioModel
      .listar(fkEmpresa)
      .then((resultado) => {
        res.status(200).json(resultado);
      })
      .catch((erro) => {
        console.log("Erro em listar:", erro);
        res.status(500).json(erro);
      });
  }
}

function cadastrar(req, res) {
  var { nomeServer: nome, emailServer: email, senhaServer: senha, telefoneServer: tel, cpfServer: cpf, cargoServer: cargo, codigoSegurancaServer: codigoSeguranca } = req.body;

  // Verificando se todos os campos obrigatórios estão preenchidos
  if (!nome || !email || !senha || !tel || !cpf || !cargo || !codigoSeguranca) {
    return res.status(400).send("Preencha todos os campos obrigatórios.");
  }

  // Busca o idEmpresa com base no código de segurança
  usuarioModel.buscarIdEmpresaPorCodigo(codigoSeguranca)
    .then((resultado) => {
      if (resultado.length === 0) {
        return res.status(404).send("Código de segurança inválido.");
      }
      
      const fkEmpresa = resultado[0].idEmpresa;

      // Cadastro do usuário com o idEmpresa encontrado
      usuarioModel.cadastrar(nome, email, senha, tel, cpf, cargo, fkEmpresa)
        .then(() => res.status(201).send("Cadastro realizado com sucesso!"))
        .catch((erro) => {
          console.error("Erro ao cadastrar usuário:", erro);
          res.status(500).send("Erro ao realizar o cadastro.");
        });
    })
    .catch((erro) => {
      console.error("Erro ao buscar idEmpresa:", erro);
      res.status(500).send("Erro ao verificar código de segurança.");
    });
}


function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var codigoSeguranca = req.body.codigoSegurancaServer;

  if (!email || !senha || !codigoSeguranca) {
    res.status(400).send("Preencha todos os campos obrigatórios.");
  } else {
    usuarioModel
      .autenticar(email, senha, codigoSeguranca)
      .then((resultadoAutenticar) => {
        if (resultadoAutenticar.length === 1) {
          res.status(200).json(resultadoAutenticar);
        } else {
          res.status(403).send("Email, senha e/ou código de segurança inválido(s).");
        }
      })
      .catch((erro) => {
        console.log("Erro em autenticar:", erro);
        res.status(500).json(erro);
      });
  }
}

module.exports = {
  listar,
  cadastrar,
  autenticar,
};
