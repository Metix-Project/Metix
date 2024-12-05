// define o arquivo de models:
var historicoModel = require("../models/historicoModel.js");

function pegarMedias(req, res) {
    var sundayValue = req.body.sundayServer;
    var saturdayValue = req.body.saturdayServer;
    var macAddress = req.body.macAddressServer;

    historicoModel.pegarMedias(macAddress, sundayValue, saturdayValue)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log("historicoModel.js: ", erro);
        res.status(500).json(erro);
    });
}

function pegarMediasSemanais(req, res){
    var data = req.body.dataServer;
    var macAddress = req.body.macAddressServer;

    historicoModel.pegarMediasSemanais(macAddress, data)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log("historicoModel.js: ", erro);
        res.status(500).json(erro);
    });
}

function pegarUltimos105Dias(req, res){
    var macAddress = req.body.macAddressServer;

    historicoModel.pegarUltimos105Dias(macAddress)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log("historicoModel.js: ", erro);
        res.status(500).json(erro);
    });
}

// exporta para outro arquivo:
module.exports = {
    pegarMedias,
    pegarMediasSemanais,
    pegarUltimos105Dias
};
 