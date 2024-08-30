# importa as bibliotecas:
import psutil
import time

import mysql.connector
from uuid import getnode

print("Bem Vindo\n")
print("1 - Fazer Login")
print("2 - Sair")
opcao = int(input())

if (opcao == 1):
    mydb = mysql.connector.connect(
            user='metixUser', 
            password='sptech',
            host='10.18.33.18',
            database='Metix'
    )
    
    mycursor = mydb.cursor()

    print("Email:")
    email = str(input())

    print("Senha:")
    senha = str(input())

    #armazena a instrução e os valores:
    sql = "SELECT cargo FROM Usuario WHERE email = '" + email + "' and senha = " + senha
    
    # executa a instrução (várias vezes por causa do loop):
    mycursor.execute(sql)

    #o conector mysql do python não envia automaticamente a instrução
    # logo, o método commit envia a instrução para o servidor de banco de dados:
    resultado = mycursor.fetchall()
    if len(resultado) <= 0:
        print("Usuário não cadastrado no sistema")
    elif resultado[0] == "Técnico":
        # conecta ao banco de dados usando um usuário com acesso limitado:
        print("Escolha o que deseja monitorar: \n")
        print("1 - Todos os Pontos de Controle")
        print("2 - Um Ponto de Controle")
        print("3 - Uma máquina")
        escolha = int(input())

        if(escolha == 3):
            print("Insira o Mac da maquina")
            MMAD = str(input())

        print("Tempo a monitorar:")
        print("1 - Ao vivo")
        print("2 - Média Dia\n")
        temp = input()

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


        comp += metV

        # inicia um loop infinito:
        if temp == 1:
            while True:
                # cria um cursor da conexão para realizar uma instrução:
                mycursor = mydb.cursor()

                if escolha == 3:
                    #armazena a instrução e os valores:
                    sql = "SELECT " + comp + " FROM dadosservidor WHERE macAddress = '" + MMAD + "' order by dataHora desc"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)

        elif temp == 2:
            mycursor = mydb.cursor()

            if escolha == 3:
                #armazena a instrução e os valores:
                sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE macAddress = '" + MMAD + "' and dataHora >= DATE(NOW()) - INTERVAL 1 DAY"

                # executa a instrução (várias vezes por causa do loop):
                mycursor.execute(sql)

                #o conector mysql do python não envia automaticamente a instrução
                # logo, o método commit envia a instrução para o servidor de banco de dados:
                resultado = mycursor.fetchall()
                print(resultado[0])

        
                # espera 2 segundos para iniciar o loop novamente
                time.sleep(5)

    elif resultado[0] == "Gerente":
            # conecta ao banco de dados usando um usuário com acesso limitado:
            print("Escolha o que deseja monitorar: \n")
            print("1 - Todos os Pontos de Controle")
            print("2 - Um Ponto de Controle")
            print("3 - Uma máquina")
            escolha = int(input())

            if(escolha == 2):
                print("Escolha o Ponto de Controle:")
                print("1")
                print("2")
                print("3")
                print("4")
                PCS = str(input())
            elif(escolha == 3):
                print("Insira o Mac da maquina")
                MMAD = str(input())

            print("Tempo a monitorar:")
            print("1 - Semana")
            print("2 - Mês")
            print("3 - Ano")
            print("4 - Tudo\n")
            temp = input()

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
            if temp == 1:
                # cria um cursor da conexão para realizar uma instrução:
                mycursor = mydb.cursor()

                if escolha == 1:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE dataHora >= DATE(NOW()) - INTERVAL 7 DAY"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 2:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE pontoDeControle = '" + PCS + "' and dataHora >= DATE(NOW()) - INTERVAL 7 DAY"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)

                elif escolha == 3:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE macAddress = '" + MMAD + "' and dataHora >= DATE(NOW()) - INTERVAL 7 DAY"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)

            elif temp == 2:
                mycursor = mydb.cursor()

                if escolha == 1:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE dataHora >= DATE(NOW()) - INTERVAL 1 MONTH"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 2:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE pontoDeControle = '" + PCS + "' and dataHora >= DATE(NOW()) - INTERVAL 1 MONTH"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 3:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE macAddress = '" + MMAD + "' and dataHora >= DATE(NOW()) - INTERVAL 1 MONTH"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
            
            elif temp == 3:
                mycursor = mydb.cursor()

                if escolha == 1:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE dataHora >= DATE(NOW()) - INTERVAL 1 YEAR"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 2:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE pontoDeControle = '" + PCS + "' and dataHora >= DATE(NOW()) - INTERVAL 1 YEAR"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 3:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE macAddress = '" + MMAD + "' and dataHora >= DATE(NOW()) - INTERVAL 1 YEAR"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)

            elif temp == 4:
                mycursor = mydb.cursor()


                if escolha == 1:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor"

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 2:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE pontoDeControle = '" + PCS 

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
                elif escolha == 3:
                    #armazena a instrução e os valores:
                    sql = "SELECT avg(" + comp + ") FROM dadosservidor WHERE macAddress = '" + MMAD 

                    # executa a instrução (várias vezes por causa do loop):
                    mycursor.execute(sql)

                    #o conector mysql do python não envia automaticamente a instrução
                    # logo, o método commit envia a instrução para o servidor de banco de dados:
                    resultado = mycursor.fetchall()
                    print(resultado[0])

            
                    # espera 2 segundos para iniciar o loop novamente
                    time.sleep(5)
        
                


        
                

