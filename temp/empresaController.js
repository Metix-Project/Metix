var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var razao = req.body.razaoServer;
    var fantasia = req.body.fantasiaServer;
    var email = req.body.emailServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telefoneServer;
  
    if (razao == undefined) {
      res.status(400).send("Sua razão está undefined!");
    } else if (fantasia = undefined) {
      res.status(400).send("Seu nome fantasia está undefined!");
    } else if (email == undefined) {
      res.status(400).send("Seu e-mail está undefined!");
    }  else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu número de telefone está undefined!")
    } else {

        empresaModel.cadastrar(razao, fantasia, email, cnpj, telefone
        )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            ); 
    }
  }

module.exports = {
    cadastrar,
  };