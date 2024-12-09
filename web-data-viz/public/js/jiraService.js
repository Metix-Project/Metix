const axios = require('axios');

// Credenciais do Jira
const username = 'victor.braga@sptech.school';
const password = 'ATATT3xFfGF0NGXPPPP_WdBnFNzSLzJ-eXbw9lUVyO0n9RdxVUdX4MX4lXb_wRcbxs13tDB9HDW8gDtpaYjGApiQ4WJkzHCnhTIAbbBjt0p6qotQjMQt5rM2yb3AasgE3cbqhY4j512j6dGsnDqnh-QG7wZWR30mI3FkQhXb3IyxTYkLasbdyl8=42FEE82C';
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
