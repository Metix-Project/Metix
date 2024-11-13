// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var usuarioController = require("../controllers/usuarioController.js");

// redireciona para o controller caso seja o método "post":
router.get("/listar", function (req, res) {
  usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

// exporta para outro arquivo:
module.exports = router;
  