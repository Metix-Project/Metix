// declaração das variáveis:
// var ambiente_processo = 'producao'; // em caso de produção
var ambiente_processo = "desenvolvimento"; // em caso de desenvolvimento
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

// declaração das bibliotecas/dependências:
//   traz os dados do arquivo .env ou .env.dev:
require("dotenv").config({ path: caminho_env });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI("AIzaSyCWAwKNsOCgXjB7IFZPgyqz_KLQhj-agwk");

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
  Analise os componentes acima, já indicando o processamento, uso da memória RAM e uso do armazenamento em cada dia do JSON, e indique qual é o problema que está ocorrendo. Vale ressaltar que:
  - O limite do uso do processador (CPU) é de 75%; \n
  - O limite uso da Memória RAM é de 75%; \n
  - O limite do espaço em uso do Armazenamento (Disco) é de 75%.\n\n
`;

const texto2 = `Com a análise feita, explique como a sua análise foi feita para cada componente separadamente (Processador, Memória RAM e Disco). Indique também os dias que ultrapassaram o limite em algum dos componentes.\n\n`;

const texto3 = `Após isso, resuma tudo que você disse anteriormente em, no máximo, 5 palavras.\n\n`;

const texto4 = `Observações: \n
- Os títulos devem ser: "1- Explicação Detalhada da Análise Feita", "2- Processador", "3- Memória RAM", "4- Armazenamento", "5- Sugestões" e "6- Resumo"; \n
- Para separar cada título, escreva "CUT_HERE" antes do título; \n 
- Nas sugestões, explique o motivo de cada uma da sugestão indicada. Todas as sugestões devem ser oferecidas aqui; \n
- Em "Resumo", o texto deve conter, no máximo, 5 palavras e indicar o componente com problemas. Não ultrapasse este limite!; \n
- Não mencione "JSON", "CSV" ou "Métix" no texto. \n\n`;

const texto5 = `Para mais informações, veja o contexto do projeto abaixo:\n
A Métix está proponto um sistema no qual irá monitorar os componentes dos servidores do Banco Central do Brasil responsáveis pelas transações de Pix em todo o território brasileiro. Para isso, foi desenvolvido dashboards para a analise desses dados a fim de prevenir e evitar os impactos causados pela sobrecarga desses componentes dos servidores diariamente, visto que há uma forte demanda de uso do Pix no Brasil.\n`;

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
  textoIA.push(texto5);

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

// Importar o serviço do Jira
const { createIssue } = require('./public/js/jiraService.js');

// Adicionar a rota para lidar com a criação de tickets
app.post('/api/maintenance/create-ticket', async (req, res) => {
  const { summary, description } = req.body;

  try {
    // Chamar o serviço para criar o ticket no Jira
    const ticketKey = await createIssue('METIX', summary, description);
    res.status(200).json({ ticketKey });
  } catch (error) {
    console.error('Erro ao criar ticket no Jira:', error);
    res.status(500).json({ error: 'Erro ao criar ticket no Jira' });
  }
});

