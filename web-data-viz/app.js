// var ambiente_processo = 'producao';
var ambiente_processo = "desenvolvimento";
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

// bibliotecas/dependências:
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

// arquivos de rotas:
var usuarioRouter = require("./src/routes/usuarios");
var servidorRouter = require("./src/routes/servidor");
var graficosRouter = require("./src/routes/graficos");

// declarando o servidor:
var app = express();

//   configurações de servidor:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

//     definindo as rotas:
app.use("/usuarios", usuarioRouter);
app.use("/servidor", servidorRouter);
app.use("/graficos", graficosRouter);

//   rodando o servidor (listing):
app.listen(PORTA_APP, function () {
  console.log(`Servidor rodando`);
});
