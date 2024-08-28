# importa as bibliotecas:
import psutil
import time

import mysql.connector
from uuid import getnode

print("Qual seu cargo: \n")
print("1 - Tecnico")
print("2 - Gerente")
cargo = int(input())

if (cargo == 1):
    # conecta ao banco de dados usando um usuário com acesso limitado:
    print("Você não tem permissão para fazer buscar no MySQL")
    
    

print("Escolha qual máquina deseja monitorar: \n")
print("1")
print("2")
print("3")
print("4")
print("5")
print("6 - Maquina do Giorgio")
escolha = int(input())

if (escolha == 1):
    macAddress = "58ce2a600896"
elif (escolha == 2):
    macAddress = "acd564f2aa42"
elif (escolha == 3):
    macAddress = "d09466c9ee89"
elif (escolha == 4):
    macAddress = "d8c8f6a6f032"
elif (escolha == 5):
    macAddress = "e8fb1cd57ab6"
elif (escolha == 6):
    macAddress = "5ccd5bc8694a"

print("Escolha qual componente deseja monitorar:")
print("Cpu")
print("Memoria")
print("Disco \n")
comp = input()

print("Escolha métrica monitorar:")
print("1 percentual")
print("2 bytes \n")
met = input()

if (met == "1"):
    metV = "Porc"
elif (met == "2"):
    metV = "Byte"




comp = comp + metV

# inicia um loop infinito:
while True:
  mydb = mysql.connector.connect(
    user='root', 
    password='L3108P1702',
    host='localhost',
    database='Metix'
    )

  mycursor = mydb.cursor()
  

  print("\n \n==========================")
  print("\n \nValores:")
  print (comp)
  print (macAddress)
  print ()
  print("\n")
  # cria um cursor da conexão para realizar uma instrução:


  # armazena a instrução e os valores:
  sql = "SELECT " + comp + " FROM dadosservidor WHERE macAddress = '" + macAddress + "' order by dataHora desc"
  val = [
    (comp, macAddress)
  ]

  # executa a instrução (várias vezes por causa do loop):
  mycursor.execute(sql)

  # o conector mysql do python não envia automaticamente a instrução
  # logo, o método commit envia a instrução para o servidor de banco de dados:
  resultado = mycursor.fetchall()
  print(resultado[0])

  
  # espera 2 segundos para iniciar o loop novamente
  time.sleep(5)
