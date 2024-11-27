// define o arquivo de models:
var historicoModel = require("../models/historicoModel.js");

function pegarMedias(req, res) {
    var data = req.body.dataServer;
    var macAddress = req.body.macAddressServer;

    // envia os dados para a função `pegarDados` do model:
    historicoModel.pegarMedias(macAddress, data)
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
};
 