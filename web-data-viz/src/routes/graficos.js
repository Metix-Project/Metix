// dependências:
var express = require("express");
var router = express.Router();

// arquivo do controller:
var graficosController = require("../controllers/graficosController.js");

// redirecionando para o controller:
router.get("/pegarDados", function (req, res) {
  graficosController.pegarDados(req, res);
});

// exportando para outro arquivo:
module.exports = router;
