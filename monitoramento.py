import psutil;
import time;

import mysql.connector
from uuid import getnode as get_mac
macAddress = get_mac()

mydb = mysql.connector.connect(user='metixUser', 
                              password='sptech',
                              host='10.18.33.18',
                              database='metix')


i = 1


while i == 1:
    time.sleep(2)
    print('\n')
    print('\n')

    cpu = psutil.cpu_percent()
    print('Percentual de gasto CPU:')
    print(cpu)

    memoria = psutil.virtual_memory().percent
    print('Percentual de gasto memoria:')
    print(memoria)

    disco = psutil.disk_usage('C:\\').percent
    print('Percentual de gasto de disco:')
    print(disco)

    mycursor = mydb.cursor()

    sql = "INSERT INTO DadosServidor (macAddress, dadosCpu, dadosMemoria, dadosDisco) VALUES (%s, %s, %s, %s)"
    val = [
      (macAddress, cpu, memoria, disco)
    ]

    mycursor.executemany(sql, val)

    mydb.commit()

    # print(mycursor.rowcount, "was inserted.")
