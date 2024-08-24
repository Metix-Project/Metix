// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var servidorController = require("../controllers/servidorController.js");

// redireciona para o controller caso seja o método "post":
router.post("/listar", function (req, res) {
  servidorController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
  servidorController.cadastrar(req, res);
});

// exporta para outro arquivo:
module.exports = router;
