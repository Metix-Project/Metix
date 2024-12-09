const axios = require('axios');

// Credenciais do Jira
const username = 'victor.braga@sptech.school';
const password = 'ATATT3xFfGF0vYEFz6vNUICGlIP_TvhWdeO0DqS3YeMBz4nzDJji3_wCXEvQZYjo1z6imyqTQW-wOLgB9Vi_IA57Bcl-X71LzHxIBl867suLIVtYNbXLEdPRdmn7uz051ruBhpOnSZf0yeaGFsO7AuSzGpB5BHH3Y9o9jvKyi5zJuO0-2p4Ezk8=0321D8F4';
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
