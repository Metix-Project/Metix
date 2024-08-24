// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var graficosController = require("../controllers/graficosController.js");

// redireciona para o controller caso seja o método "get":
router.get("/pegarDados", function (req, res) {
  graficosController.pegarDados(req, res);
});

// exporta para outro arquivo:
module.exports = router;
