# importa as bibliotecas:
import psutil
import time

import mysql.connector
from uuid import getnode

# recebe o endereço MAC do computador como um número inteiro
# transforma em um número hexadecimal como string
# armazena a string removendo os 2 primeiros caracteres '0x', que servem para identificar um hexadecimal:
macAddress = hex(getnode())[2:]

# conecta ao banco de dados usando um usuário com acesso limitado:
mydb = mysql.connector.connect(
  user='metixUserInsert', 
  password='sptech',
  host='10.18.33.18',
  database='Metix'
)

# inicia um loop infinito:
while True:
  # faz o monitoramento em percentual:
  print('Monitoramento:')
  
  # lê e exibe o uso da CPU:
  cpu = psutil.cpu_percent()
  print(f'  Percentual de gasto CPU: {cpu}')

  # lê e exibe o uso da memória RAM:
  memoria = psutil.virtual_memory().percent
  print(f'  Percentual de gasto memoria: {memoria}')

  # armazena as partições do hardware:
  particoes = psutil.disk_partitions()
  # guarda a primeira partição (index 0):
  primeiraParticao = particoes[0]
  # armazena o caminho da primeira partição (guardado na no index 1)
  caminhoPrimeiraParticao = primeiraParticao[1]
  # lê e exibe o uso do primeiro e único disco:
  disco = psutil.disk_usage(caminhoPrimeiraParticao).percent
  print(f'  Percentual de gasto de disco: {disco}')

  # cria um cursor da conexão para realizar uma instrução:
  mycursor = mydb.cursor()

  # armazena a instrução e os valores:
  sql = "INSERT INTO DadosServidor (macAddress, dadosCpu, dadosMemoria, dadosDisco) VALUES (%s, %s, %s, %s)"
  val = [
    (macAddress, cpu, memoria, disco)
  ]

  # executa a instrução (várias vezes por causa do loop):
  mycursor.executemany(sql, val)

  # o conector mysql do python não envia automaticamente a instrução
  # logo, o método commit envia a instrução para o servidor de banco de dados:
  mydb.commit()
  
  # espera 2 segundos para iniciar o loop novamente
  time.sleep(2)
