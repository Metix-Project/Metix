// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var historicoController = require("../controllers/historicoController.js");

// redireciona para o controller caso seja o método "get":
router.post("/pegarMedias", function (req, res) {
  historicoController.pegarMedias(req, res);
});

// exporta para outro arquivo:
module.exports = router; 
