const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  // Importando o pacote CORS

const app = express();
const port = 3000;

// Usando o middleware CORS para permitir requisições de outros domínios
app.use(cors({
  origin: 'http://localhost:3333',  // Permite apenas requisições de localhost:3333
}));

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Credenciais do Jira
const username = 'victor.braga@sptech.school';
const domain = 'metix2';

const auth = {
  username: username,
  password: password
};

// Função para criar um ticket no Jira
async function createIssue(projectKey, summary, description) {
  const baseUrl = `https://${domain}.atlassian.net`;
  const data = {
    fields: {
      project: {
        key: projectKey
      },
      summary: summary,
      description: description,
      issuetype: {
        name: 'Manutencao'
      }
    }
  };

  try {
    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, {
      auth: auth,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.key;
  } catch (error) {
    console.error('Erro ao criar o ticket:', error.response ? error.response.data : error.message);
    throw error;
  }
}

app.post('/create-maintenance-ticket', async (req, res) => {
    const { summary, description } = req.body;
    console.log('Dados recebidos do frontend:', { summary, description });  // Log dos dados recebidos
  
    try {
      const ticketKey = await createIssue('METIX', summary, description);  // 'METIX' é o código do seu projeto
      console.log('Ticket criado:', ticketKey);  // Log da criação do ticket
      res.status(200).json({ ticketKey });
    } catch (error) {
      console.error('Erro ao criar ticket no Jira:', error);  // Log de erro
      res.status(500).json({ error: 'Erro ao criar ticket no Jira' });
    }
  });
  

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});

