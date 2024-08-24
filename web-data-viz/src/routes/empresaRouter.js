// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var empresaController = require("../controllers/empresaController.js");

// redireciona para o controller caso seja o método "get":
router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});
// redireciona para o controller caso seja o método "post":
router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar(req, res);
});

router.post("/buscarPorId/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.post("/buscarPorCnpj", function (req, res) {
  empresaController.buscarPorCnpj(req, res);
});

// exporta para outro arquivo:
module.exports = router;
