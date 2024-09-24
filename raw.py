import psutil
import time
import csv
from datetime import datetime, timedelta
import boto3
from uuid import getnode as get_mac

# Obtendo o endereço MAC e garantindo que ele tenha 12 caracteres
macAddress = hex(get_mac())[2:].zfill(12)

print("Iniciando a coleta de dados.")

dados_capturados = []

tempo_final = datetime.now() + timedelta(minutes=1)

while datetime.now() < tempo_final:
    time.sleep(5) 

    cpuP = psutil.cpu_percent()
    
    cpu_times = psutil.cpu_times()
    cpuB = cpu_times[0] + cpu_times[1]
    
    memoriaP = psutil.virtual_memory().percent
    memoriaB = psutil.virtual_memory().used
    discoP = psutil.disk_usage('/').percent
    discoB = psutil.disk_usage('/').used

    memoriaB_gb = memoriaB / (2 ** 30)  
    discoB_gb = discoB / (2 ** 30)      

    dados_capturados.append([macAddress, cpuP, memoriaP, discoP, cpuB, memoriaB_gb, discoB_gb])

    print(f'CPU: {cpuP}%, Memória: {memoriaP}%, Disco: {discoP}%')

arquivo_csv = "dadosCapturados.csv"

with open(arquivo_csv, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["macAddress", "cpuPorc", "memoriaPorc", "discoPorc", "cpuAbs", "memoriaAbs", "discoAbs"])
    writer.writerows(dados_capturados)

print(f"Dados capturados e salvos em {arquivo_csv}.")

s3 = boto3.client('s3')
bucket_name = "s3-raw-metix"

try:
    s3.upload_file(arquivo_csv, bucket_name, arquivo_csv)
    print(f"Arquivo {arquivo_csv} enviado para o bucket S3 {bucket_name}.")
except Exception as e:
    print(f"Falha ao enviar o arquivo: {e}")
