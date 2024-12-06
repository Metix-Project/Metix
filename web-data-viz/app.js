// declaração das variáveis:
// var ambiente_processo = 'producao'; // em caso de produção
var ambiente_processo = "desenvolvimento"; // em caso de desenvolvimento
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

// declaração das bibliotecas/dependências:
//   traz os dados do arquivo .env ou .env.dev:
require("dotenv").config({ path: caminho_env });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI("AIzaSyBBVHY5V-ep6SqycYO6wBUfNk2ZvO3ovmk");

//   define as bibliotecas/frameworks:
var express = require("express");
var cors = require("cors");
var path = require("path");

// define os arquivos de rotas:
var usuarioRouter = require("./src/routes/usuarioRouter.js");
var servidorRouter = require("./src/routes/servidorRouter.js");
var graficosRouter = require("./src/routes/graficosRouter.js");
var historicoRouter = require("./src/routes/historicoRouter.js");

var alertaRouter = require("./src/routes/alertaRouter.js");
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
app.use("/historico", historicoRouter);
app.use("/alertaRouter", alertaRouter)

//   roda o servidor (listing/escuta por conexões):
app.listen(process.env.APP_PORT, function () {
  console.log("Bem-vindo(a) à Metix!");
  console.log(`Servidor rodando em http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  // console.log("Servidor rodando em: http://ec2-98-80-26-79.compute-1.amazonaws.com:3333");
});

const textoIA = [];

const texto1 = `
  Analise os componentes acima, já indicando o processamento, uso da memória RAM e uso do armazenamento em cada dia do JSON, e indique qual é o problema que está ocorrendo e sugira o que poderia ser feito para melhorias apenas nos componentes com problemas. Vale ressaltar que:
  - O limite do uso do processador (CPU) é de 85%; \n
  - O limite uso da Memória RAM é de 855%; \n
  - O limite do espaço em uso do Armazenamento (Disco) é de 85%.\n\n
`;

const texto2 = `Com a análise feita, explique como a sua análise foi feita para cada componente separadamente (Processador, Memória RAM e Disco). Indique também os dias que ultrapassaram o limite em algum dos componentes.\n\n`;

const texto3 = `Após isso, resuma tudo que você disse anteriormente em, no máximo, 5 palavras.\n\n`;

const texto4 = `Observações: \n
- Os títulos devem ser: "Explicação da Análise Feita", "Processador", "Memória RAM", "Armazenamento", "Sugestão(ões)" e "Resumo"; \n
- Nas sugestões, explique o motivo de cada uma da sugestão indicada; \n
- Em "Resumo", o texto deve conter, no máximo, 5 palavras e indicar o componente com problemas. Não ultrapasse este limite!; \n`;

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

  const jsonValores = dia.map((day, index) => ({
    dia: day,
    cpu: cpu[index],
    ram: ram[index],
    disco: disco[index]
  }));

  // console.log(JSON.stringify(jsonValores));

  const componentValues = `\n
      - DIAS, PROCESSADOR, MEMÓRIA RAM E ARMAZENAMENTO (valores em porcentagem, exceto os dias): ${JSON.stringify(jsonValores)} \n
      - Total da Memória RAM (em Gigabytes): ${totalRam} \n
      - Total de Armazenamento (em Gigabytes): ${totalDisco}\n\n
    `;

  textoIA.push(componentValues);
  textoIA.push(texto1);
  textoIA.push(texto2);
  textoIA.push(texto3);
  textoIA.push(texto4);
  // textoIA.push(texto5);

  try {
    let resultado = await gerarSugestao(textoIA);
    
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
