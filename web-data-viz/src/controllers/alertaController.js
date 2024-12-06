// Define o arquivo de models
var alertaModel = require("../models/alertaModel.js");

// Lista o ranking de alertas por servidor
function listarRanking(req, res) {
  var macAddress = req.body.macAddressServer;
  alertaModel
    .listarRanking(macAddress)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao listar ranking:", erro);
      res.status(500).json(erro);
    });
}

// Lista a quantidade de alertas por servidor, componente e período
function listarQtdPorServidor(req, res) {
  alertaModel
    .listarQtdPorServidor()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.error("Erro ao listar quantidade de alertas por servidor:", erro);
      res.status(500).json(erro);
    });
}

// Lista alertas por estado (ALERTA)
function listarPorEstadoAlerta(req, res) {
  alertaModel
    .listarPorEstadoAlerta()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.error("Erro ao listar alertas em estado de ALERTA:", erro);
      res.status(500).json(erro);
    });
}

// Lista alertas por estado (RISCO)
function listarPorEstadoRisco(req, res) {
  alertaModel
    .listarPorEstadoRisco()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.error("Erro ao listar alertas em estado de RISCO:", erro);
      res.status(500).json(erro);
    });
}

// Lista alertas das últimas 24 horas
function listarUltimas24Horas(req, res) {
  alertaModel
    .listarUltimas24Horas()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.error("Erro ao listar alertas das últimas 24 horas:", erro);
      res.status(500).json(erro);
    });
}

// Lista todos os alertas já gerados
function listarTodos(req, res) {
  alertaModel
    .listarTodos()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => {
      console.error("Erro ao listar todos os alertas:", erro);
      res.status(500).json(erro);
    });
}

// Exporta as funções para as rotas
module.exports = {
  listarRanking,
  listarQtdPorServidor,
  listarPorEstadoAlerta,
  listarPorEstadoRisco,
  listarUltimas24Horas,
  listarTodos,
};
