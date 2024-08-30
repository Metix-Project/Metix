import psutil;
import time;

import mysql.connector
from uuid import getnode as get_mac
macAddress = hex(get_mac())[2:]

mydb = mysql.connector.connect(user='metixUser', 
                              password='sptech',
                              host='10.18.33.18',
                              database='Metix')


    
mycursor = mydb.cursor()

#armazena a instrução e os valores:
sql = "SELECT pontoDeControle FROM Servidor WHERE macAddress = '" + macAddress + "'"

# executa a instrução (várias vezes por causa do loop):
mycursor.execute(sql)

#o conector mysql do python não envia automaticamente a instrução
# logo, o método commit envia a instrução para o servidor de banco de dados:
resultado = mycursor.fetchall()

if len(resultado) <= 0:
    print("Máquina de Mac: " + macAddress + " não cadastrada no nosso sistema.")

else:
    i = 1

    while i == 1:
        time.sleep(5)
        print('\n')
        print('\n')

        cpuP = psutil.cpu_percent()
        print('Percentual de gasto CPU:')
        print(cpuP)

        cpuB = psutil.cpu_times()[0] + psutil.cpu_times()[1]
        print('Bytes gastos CPU:')
        print(cpuB)

        memoriaP = psutil.virtual_memory().percent
        print('Percentual de gasto memoria:')
        print(memoriaP)

        memoriaB = psutil.virtual_memory().used
        print('Bytes gasto de memoria:')
        print(memoriaB)

        discoP = psutil.disk_usage('/').percent
        print('Percentual de gasto de disco:')
        print(discoP)

        discoB = psutil.disk_usage('/').used
        print('Bytes gasto em Disco:')
        print(discoB)

        mycursor = mydb.cursor()

        memoriaB = memoriaB / (2**32)
        discoB = discoB / (2**32)

        sql = "INSERT INTO DadosServidor (macAddress, CpuPorc, MemoriaPorc, DiscoPorc, CpuByte, MemoriaByte, DiscoByte, pontoDeControle) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = [
          (macAddress, cpuP, memoriaP, discoP, cpuB, memoriaB, discoB, resultado[0][0])
        ]

        mycursor.executemany(sql, val)

        mydb.commit()

        # print(mycursor.rowcount, "was inserted.")
