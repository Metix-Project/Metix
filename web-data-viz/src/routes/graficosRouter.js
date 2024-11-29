// dependências:
var express = require("express");
var router = express.Router();

// define o arquivo de controller:
var graficosController = require("../controllers/graficosController.js");

// redireciona para o controller caso seja o método "get":
router.get("/pegarDados", function (req, res) {
  graficosController.pegarDados(req, res);
});

router.post("/DadosKpiCPU", function (req, res) {
  graficosController.DadosKpiCPU(req, res);
});

router.post("/DadosKpiCPUPicos", function (req, res) {
  graficosController.DadosKpiCPUPicos(req, res);
});

router.get("/DadosKpiCPUAlertas", function (req, res) {
  graficosController.DadosKpiCPUAlertas(req, res);
});

router.get("/DadosKpiCPUTempoReal", function (req, res) {
  graficosController.DadosKpiCPUTempoReal(req, res);
});

router.get("/DadosKpiMemoria", function (req, res) {
  graficosController.DadosKpiMemoria(req, res);
});

router.get("/DadosKpiMemoriaPicos", function (req, res) {
  graficosController.DadosKpiMemoriaPicos(req, res);
});

router.get("/DadosKpiMemoriaAlertas", function (req, res) {
  graficosController.DadosKpiMemoriaAlertas(req, res);
});

router.get("/DadosKpiMemoriaTempoReal", function (req, res) {
  graficosController.DadosKpiMemoriaTempoReal(req, res);
});

router.get("/DadosKpiRede", function (req, res) {
  graficosController.DadosKpiRede(req, res);
});

router.get("/DadosKpiRedePicos", function (req, res) {
  graficosController.DadosKpiRedePicos(req, res);
});

router.get("/DadosKpiRedeAlertas", function (req, res) {
  graficosController.DadosKpiRedeAlertas(req, res);
});

router.get("/GraficoRedeTempoReal", function (req, res) {
  graficosController.GraficoRedeTempoReal(req, res);
});
// exporta para outro arquivo:
module.exports = router;
