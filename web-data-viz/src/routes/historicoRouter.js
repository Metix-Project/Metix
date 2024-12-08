// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var historicoController = require("../controllers/historicoController.js");

// redireciona para o controller caso seja o método "get":
router.post("/pegarMedias", function (req, res) {
  historicoController.pegarMedias(req, res);
});

router.post("/pegarMediasSemanais", function (req, res) {
  historicoController.pegarMediasSemanais(req, res);
});

router.post("/pegarUltimos105Dias", function (req, res) {
  historicoController.pegarUltimos105Dias(req, res);
});

router.post("/pegarTotalAlertas", function (req, res) {
  historicoController.pegarTotalAlertas(req, res);
});

router.post("/capturarUltimoAlerta", function (req, res) {
  historicoController.capturarUltimoAlerta(req, res);
});

// exporta para outro arquivo:
module.exports = router; 
