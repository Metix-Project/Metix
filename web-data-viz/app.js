// declaração das variáveis:
// var ambiente_processo = 'producao'; // em caso de produção
var ambiente_processo = "desenvolvimento"; // em caso de desenvolvimento
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

// declaração das bibliotecas/dependências:
//   traz os dados do arquivo .env ou .env.dev:
require("dotenv").config({ path: caminho_env });

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
app.use("/graficos", graficosRouter);

//   roda o servidor (listing/escuta por conexões):
app.listen(process.env.APP_PORT, function () {
  console.log(`Servidor rodando em http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  // console.log("Servidor rodando em: http://ec2-98-80-26-79.compute-1.amazonaws.com:3333");
});
