const axios = require('axios');

// Credenciais do Jira
const username = 'victor.braga@sptech.school';
const password = 'ATATT3xFfGF0A3sFstw9dONGL6Zc6VHEseN_s2dol5iKVsVliNi7PWYA1H-EMVMIcUZ_T_R8H9MfYg_gIL9NYHtZzQ5oAdilmzkcNnW1-cSJRl06TPNoo7P6fwvrc1XKOFQ2Khqcx_NcF_hli2KIANLN9wahDdif8QbNlqSiOEs6W0d-Qs00pxM=5D0466EF';
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
