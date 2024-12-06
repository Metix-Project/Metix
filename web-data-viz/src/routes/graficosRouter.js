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

router.post("/DadosKpiCPUAlertas", function (req, res) {
  graficosController.DadosKpiCPUAlertas(req, res);
});

router.post("/DadosKpiCPUTempoReal", function (req, res) {
  graficosController.DadosKpiCPUTempoReal(req, res);
});

router.post("/DadosKpiMemoria", function (req, res) {
  graficosController.DadosKpiMemoria(req, res);
});

router.post("/DadosKpiMemoriaPicos", function (req, res) {
  graficosController.DadosKpiMemoriaPicos(req, res);
});

router.post("/DadosKpiMemoriaAlertas", function (req, res) {
  graficosController.DadosKpiMemoriaAlertas(req, res);
});

router.post("/DadosKpiMemoriaTempoReal", function (req, res) {
  graficosController.DadosKpiMemoriaTempoReal(req, res);
});

router.post("/DadosKpiRede", function (req, res) {
  graficosController.DadosKpiRede(req, res);
});

router.post("/DadosKpiRedePicos", function (req, res) {
  graficosController.DadosKpiRedePicos(req, res);
});

router.post("/DadosKpiRedeAlertas", function (req, res) {
  graficosController.DadosKpiRedeAlertas(req, res);
});

router.post("/GraficoRedeTempoReal", function (req, res) {
  graficosController.GraficoRedeTempoReal(req, res);
});

router.post("/DadosKpiLatencia", function (req, res) {
  graficosController.DadosKpiLatencia(req, res);
});

router.post("/DadosKpiLatenciaPicos", function (req, res) {
  graficosController.DadosKpiLatenciaPicos(req, res);
});

router.post("/DadosKpiLatenciaAlertas", function (req, res) {
  graficosController.DadosKpiLatenciaAlertas(req, res);
});

router.post("/DadosKpiLatenciaTempoReal", function (req, res) {
  graficosController.DadosKpiLatenciaTempoReal(req, res);
});

router.post("/DadosKpiDisco", function (req, res) {
  graficosController.DadosKpiDisco(req, res);
});

router.post("/DadosKpiDiscoPicos", function (req, res) {
  graficosController.DadosKpiDiscoPicos(req, res);
});

router.post("/DadosKpiDiscoAlertas", function (req, res) {
  graficosController.DadosKpiDiscoAlertas(req, res);
});

router.post("/DadosKpiDiscoTempoReal", function (req, res) {
  graficosController.DadosKpiDiscoTempoReal(req, res);
});

// exporta para outro arquivo:
module.exports = router;
