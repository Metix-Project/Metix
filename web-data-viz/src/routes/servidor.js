var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController.js");

//Recebendo os dados do html e direcionando para a função cadastrar de servidorController.js
router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
})

module.exports = router;
