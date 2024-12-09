const axios = require('axios');

// Credenciais do Jira
const username = 'victor.braga@sptech.school';
const password = '';
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

module.exports = { createIssue };
