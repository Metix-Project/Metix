// declaração das variáveis:
// var ambiente_processo = 'producao'; // em caso de produção
var ambiente_processo = "desenvolvimento"; // em caso de desenvolvimento
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

// declaração das bibliotecas/dependências:
//   traz os dados do arquivo .env ou .env.dev:
require("dotenv").config({ path: caminho_env });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI("AIzaSyBEkyA_iqjNnyGzr-e4QEmWQfNMa2kfStc");

//   define as bibliotecas/frameworks:
var express = require("express");
var cors = require("cors");
var path = require("path");

// define os arquivos de rotas:
var usuarioRouter = require("./src/routes/usuarioRouter.js");
var servidorRouter = require("./src/routes/servidorRouter.js");
var graficosRouter = require("./src/routes/graficosRouter.js");

// define a variável do servidor:
var app = express();

//   define as configurações do servidor:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

//     define as rotas:
app.use("/usuarios", usuarioRouter);
app.use("/servidor", servidorRouter);
app.use("/graficosRouter", graficosRouter);

//   roda o servidor (listing/escuta por conexões):
app.listen(process.env.APP_PORT, function () {
  console.log("Bem-vindo(a) à Metix!");
  console.log(`Servidor rodando em http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  // console.log("Servidor rodando em: http://ec2-98-80-26-79.compute-1.amazonaws.com:3333");
});

var textoIA = [];
var inicio = `
  Com base no contexto e nos valores mostrados abaixo, crie um relatório após o texto "DIAS, VETORES E VALORES --->".
  Contexto: A empresa Metix é uma companhia que monitora o desempenhos dos componentes de servidores do Banco Central do Brasil responsáveis pela transação de Pix diariamente, gerando insights e dashboards de monitoramento em tempo real, histórico e previsões para o cliente poder visualizar o comportamento destes hardwares.
  O objetivo da Metix é reduzir as instabilidades nestes servidores devido às sobrecargas que ocorrem diariamente nestas máquinas. Para isso, foi delimitado alguns limites para cada componente hardware dos servidores:
  - PERCENTUAL DE USO DO PROCESSADOR: 85% no máximo (independente do modelo do processador);
  - PERCENTUAL DE USO DA MEMÓRIA RAM: 90% no máximo (independente da quantidade de RAM no servidor);
  - PERCENTUAL DE ARMAZENAMENTO EM USO: 90% no máximo (independente do tamanho do armazenamento);
  Importante destacar que os dados apresentados abaixo que estão representados em forma de vetor representam a média diária dos últimos 91 dias. Ou seja, cada valor numérico no vetor do processador representa a média daquele dia. São 91 dados a serem analisados nesses vetores. Além disso, o valor da capacidade total da Memória RAM e do Armazenamento são únicos.
  Como escrever sua análise?
  - Primeiramente, escreva uma análise explicativa do que está ocorrendo com cada componente (Processador, Memória RAM e Armazenamento);
  - Em seguida, sugira como o usuário pode atuar para evitar a sobrecarga nos componentes com problemas;
  - Escreva "CUT_HERE"
  - Faça um resumo final de, no máximo, 4 palavras
  O texto da análise deve conter as seguintes restrições:
  - Não deve ter caracteres especiais (como os asteríscos);
  - Não deve ter o nome da Metix ou do Banco Central do Brasil;
  - Não deve conter o termo "IA" na resposta;
  - É obrigatório retornar os dias em que o percentual de uso do Processador, Memória RAM ou Armazenamento esteve acima da porcentagem máxima permitida (os dias devem estar no formato exemplificado a seguir: 27/11/2024). Além disso, junto com o dia, deve haver os valores em porcentagem e em Gigabytes desses dias;
  \n
  DIAS, VETORES E VALORES --->
`;

textoIA.push(inicio);

app.post("/gerarRelatorio", async (req, res) => {
  const dia = req.body.diaServer;
  const cpu = req.body.cpuServer;
  const ram = req.body.ramServer;
  const totalRam = req.body.totalRamServer;
  const disco = req.body.discoServer;
  const totalDisco = req.body.totalDiscoServer;
  const latencia = req.body.latenciaServer;
  const mbpsRecebido = req.body.mbpsRecebidoServer;
  const mbpsEnviado = req.body.mbpsEnviadoServer;

  var componentValues = `\n
    - DIAS ANALISADOS: ${dia}\n\n
    - PERCENTUAIS MÉDIOS POR DIA SOBRE O USO DO PROCESSADOR (VALORES EM PORCENTAGEM): ${cpu}%\n
    - QUANTIDADES MÉDIAS POR DIA SOBRE O USO DA MEMÓRIA RAM (VALORES EM PORCENTAGEM): ${ram}\n
    - CAPACIDADE TOTAL DE MEMÓRIA RAM DO SERVIDOR (VALOR EM GIGABYTES): ${totalRam}\n
    - QUANTIDADE MÉDIA DIÁRIA DE ARMAZENAMENTO EM USO DO DISCO RÍGIDO (VALORES EM PORCENTAGEM): ${disco}\n
    - CAPACIDADE TOTAL DE ARMAZENAMENTO DO SERVIDOR (VALOR EM GIGABYTES): ${totalDisco}
  `;

  textoIA.push(componentValues);

  try {
    const resultado = await gerarSugestao(textoIA);
    var resultadoFormat = `IA: ${resultado}`
    textoIA.push(resultadoFormat);
    console.log(resultado);
    res.json({ resultado });
  } 
  catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

async function gerarSugestao(mensagem) {
  const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });
  try {
    const resultado = await modeloIA.generateContent(`${mensagem}`);
    const resposta = await resultado.response.text();
    return resposta;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}
