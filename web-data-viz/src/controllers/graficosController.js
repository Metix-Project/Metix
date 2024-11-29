// define o arquivo de models:
var graficosModel = require("../models/graficosModel.js");

function pegarDados(req, res) {
  // envia os dados para a função `pegarDados` do model:
  graficosModel
    .pegarDados(nome, email, senha, tel, cpf, cargo)
    .then(function (resultado) {
      // retorna o resultado para o then do fetch com um status de sucesso (200-299):
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log("servidorModel.js: ", erro);
      // retorna o erro para o then do fetch com um status de erro de servidor (500-599):
      res.status(500).json(erro);
    });
}

function DadosKpiCPU (req, res) { 
  console.log("puxando dados CPU")
  var mcAdress = req.body.mcAdressServer;
  graficosModel.DadosKpiCPU(mcAdress)
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}

async function DadosKpiCPUPicos(req, res) {
    console.log("puxando dados CPU");
    var mcAdress = req.body.mcAdressServer;

    try {
        const resultado1 = await graficosModel.DadosKpiCPUPicos(mcAdress);  
        if (resultado1.length > 0) {
            console.log("Estou no Controller");
            res.status(200).json(resultado1);  
        } else {
            res.status(204).send("Nenhum resultado encontrado");
        }
    } catch (erro) {
        console.log("Houve um erro ao buscar resultados", erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
    }
}

function DadosKpiCPUAlertas (req, res) { 
  console.log("puxando dados CPU")
  graficosModel.DadosKpiCPUAlertas()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}

function DadosKpiCPUTempoReal (req, res) { 
  console.log("puxando dados CPU")

  graficosModel.DadosKpiCPUTempoReal()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}

//MEMORIA

function DadosKpiMemoria (req, res) { 
  console.log("puxando dados Memoria")

  graficosModel.DadosKpiMemoria()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}

async function DadosKpiMemoriaPicos(req, res) {
  console.log("puxando dados Memoria");

  try {
      const resultado1 = await graficosModel.DadosKpiMemoriaPicos();  
      if (resultado1.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resultado1);  
      } else {
          res.status(204).send("Nenhum resultado encontrado");
      }
  } catch (erro) {
      console.log("Houve um erro ao buscar resultados", erro.sqlMessage);
      res.status(500).json({ error: erro.sqlMessage });
  }
}


function DadosKpiMemoriaAlertas (req, res) { 
  console.log("puxando dados Memoria")

  graficosModel.DadosKpiMemoriaAlertas()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}


function DadosKpiMemoriaTempoReal (req, res) { 
  console.log("puxando dados Memoria")

  graficosModel.DadosKpiMemoriaTempoReal()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}

function DadosKpiRede (req, res) { 
  console.log("puxando dados Rede")

  graficosModel.DadosKpiRede()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}


function DadosKpiRedePicos (req, res) { 
  console.log("puxando dados Rede");

  graficosModel.DadosKpiRedePicos()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado");
      }
  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function DadosKpiRedeAlertas (req, res) { 
  console.log("puxando dados Rede")

  graficosModel.DadosKpiRedeAlertas()
  .then(function (resposta) {
      if(resposta.length > 0) {
          console.log("Estou no Controller");
          res.status(200).json(resposta);
      } else {
        res.status(204).send("nenhum resultado encontrado")
      }

  }).catch(function (erro) {
    console.log(erro);
    console.log("houve um erro ao buscar resultados", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
  });
}


function GraficoRedeTempoReal(req, res) {
  console.log("Puxando dados de rede");

  graficosModel.GraficoRedeTempoReal()
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("Dados encontrados: ", resultado);
        res.status(200).json(resultado);  // Retorna os dados para o cliente
      } else {
        res.status(204).send("Nenhum dado encontrado");  // Caso não haja dados
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar dados: ", erro);
      res.status(500).json(erro);  // Retorna erro de servidor
    });
}



// exporta para outro arquivo:
module.exports = {
  pegarDados,
  DadosKpiCPU,
  DadosKpiCPUPicos,
  DadosKpiCPUAlertas,
  DadosKpiCPUTempoReal,

  DadosKpiMemoria,
  DadosKpiMemoriaPicos,
  DadosKpiMemoriaAlertas,
  DadosKpiMemoriaTempoReal,

  DadosKpiRede,
  DadosKpiRedePicos,
  DadosKpiRedeAlertas,
  GraficoRedeTempoReal


};
