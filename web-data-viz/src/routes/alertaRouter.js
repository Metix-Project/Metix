// Dependências
var express = require("express");
var router = express.Router();

// Define o arquivo de controller
var alertaController = require("../controllers/alertaController.js");

// Rotas para os alertas

// Lista o ranking de alertas por servidor
router.post("/listarRanking", function (req, res) {
  alertaController.listarRanking(req, res);
});

// Lista a quantidade de alertas por servidor, componente e período
router.post("/listarQtdPorServidor", function (req, res) {
  alertaController.listarQtdPorServidor(req, res);
});

// Lista alertas por estado (ALERTA)
router.post("/listarPorEstadoAlerta", function (req, res) {
  alertaController.listarPorEstadoAlerta(req, res);
});

// Lista alertas por estado (RISCO)
router.post("/listarPorEstadoRisco", function (req, res) {
  alertaController.listarPorEstadoRisco(req, res);
});

// Lista alertas das últimas 24 horas
router.post("/listarUltimas24Horas", function (req, res) {
  alertaController.listarUltimas24Horas(req, res);
});

// Lista todos os alertas já gerados
router.post("/listarTodos", function (req, res) {
  alertaController.listarTodos(req, res);
});

// Exporta para outro arquivo
module.exports = router;
