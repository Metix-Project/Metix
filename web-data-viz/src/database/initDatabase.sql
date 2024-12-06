create database Metix;
use Metix;

create table Empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(80) not null,
    nomeFantasia varchar(80),
    emailEmpresa varchar(80) not null unique,
    cnpj char(18) not null unique,
    telefoneEmpresa char(19) not null unique,
    codigoSeguranca char(6) not null unique, 
    imgLogo VARCHAR(255)
);

create table Usuario(
	idUsuario int auto_increment,
    nome varchar(80) not null,
    email varchar(80) not null unique,
    senha varchar(80) not null,
    cpf char(14) not null unique,
    telefone char(19) not null unique,
    cargo char(15) not null,
    fkEmpresa int not null,
    primary key (idUsuario, fkEmpresa),
    constraint UsuarioFkEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Servidor(
    macAddress VARCHAR(17) not null unique,
    pontoDeControle int not null,
    fkEmpresa int not null,
    primary key (macAddress, fkEmpresa),
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table DadosServidor(
dataHora datetime not null default current_timestamp,
macAddress varchar(17),
    cpuPorc decimal(7, 2),
    memoriaPorc decimal(7, 2),
    discoPorc decimal(7, 2),
    MbpsEnviados decimal(7, 2),
	MbpsRecebidos decimal(7, 2),
	Latencia decimal(7,2)
);

create table DadosServidorMedia(
	idDado INT AUTO_INCREMENT,
    fkMaquina VARCHAR(17),
    PRIMARY KEY(idDado, fkMaquina),
    CONSTRAINT fkMacAddressServidor FOREIGN KEY(fkMaquina) REFERENCES Servidor(macAddress),
    dia DATE NOT NULL,
    cpuPorc DECIMAL(7, 2) NOT NULL,
    memoriaPorc DECIMAL(5, 2) NOT NULL,
    memoriaGb DECIMAL(7, 2) NOT NULL,
	memoriaTotal DECIMAL(7, 2) NOT NULL,
    discoPorc DECIMAL(5, 2) NOT NULL,
    discoGb DECIMAL(7, 2) NOT NULL,
    discoTotal DECIMAL(7, 2) NOT NULL,
    mbpsRecebidos DECIMAL(7, 2) NOT NULL,
    mbpsEnviados DECIMAL(7, 2) NOT NULL,
	latencia DECIMAL(7,2) NOT NULL
);

create table Monitoramento(
	idMonitoramento INT AUTO_INCREMENT,
    fkServidor VARCHAR(17) NOT NULL,
    PRIMARY KEY(idMonitoramento, fkServidor),
    componente VARCHAR(15) NOT NULL,
    horaData DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivoCriacao CHAR(20) NOT NULL,
    estado VARCHAR(7) NOT NULL,
    CONSTRAINT fkServ_Monitoramento FOREIGN KEY(fkServidor) REFERENCES Servidor(macAddress),
    CONSTRAINT chk_componente CHECK (componente IN ('CPU', 'RAM', 'DISCO', 'LATÊNCIA', 'REDE')),
    CONSTRAINT chk_motivo CHECK (motivoCriacao IN ('ACIMA DA MÉDIA', 'ABAIXO DA MÉDIA')),
    CONSTRAINT chk_estado CHECK (estado IN ('ESTÁVEL', 'ALERTA', 'RISCO'))
);

select * from DadosServidor;
select * from DadosServidorMedia;

create user if not exists 'metixAdm'@'%' identified by 'sptech';
grant all privileges on Metix.* to 'metixAdm'@'%';

create user if not exists 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUser'@'%';

create user if not exists 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

-- drop user 'metixUserSelect'@'%';
create user if not exists 'metixUserSelect'@'%' identified by 'sptech';
grant select on Metix.* to 'metixUserSelect'@'%';

insert into Empresa (idEmpresa, razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa, codigoSeguranca, imgLogo) values (
	1, 
	"Banco Central do Brasil", 
	"Banco Central do Brasil", 
	"bc@br.br", 
	"12345678901234",  
	"1234567890123",
    "B3C6B9",
	"https://avatars.githubusercontent.com/u/16822015?s=200&v=4"
);

insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('14857f833746', 1, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('f946307321c2', 2, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('d09466c9be45', 3, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('c7d12465a943', 3, 1);

select * from dadosServidorMedia;

select * from dadosServidorMedia;

create table Componentes (
	idComponente int,
    fkIdServidor VARCHAR(17) NOT NULL,
    PRIMARY KEY(idComponente, fkIdServidor),
    componenteNome VARCHAR(15) NOT NULL,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo CHAR(20) NOT NULL,
    estadoAtual VARCHAR(7) NOT NULL,
    CONSTRAINT fkServComponente FOREIGN KEY(fkIdServidor) REFERENCES Servidor(macAddress),
    CONSTRAINT chk_comp CHECK (componenteNome IN ('CPU', 'RAM', 'DISCO', 'LATÊNCIA', 'REDE')),
    CONSTRAINT chk_mtv CHECK (motivo IN ('ACIMA DA MÉDIA', 'ABAIXO DA MÉDIA')),
    CONSTRAINT chk_estd CHECK (estadoAtual IN ('ESTÁVEL', 'ALERTA', 'RISCO'))
);


#Criar um contador de acordo com cada um dos servidores e o componente que gerou um alerta
SELECT Servidor.macAddress AS Servidor, 
GROUP_CONCAT(Componentes.componenteNome SEPARATOR ', ') AS componentes
FROM Servidor
LEFT JOIN Componentes 
ON Servidor.macAddress = Componentes.fkIdServidor
GROUP BY Servidor.macAddress;
#Criar função que separe os componentes


#Criar um ranking que demonstra em um periodo de (tempo escolhido pelo usuário ele realize a pesquisa)
Create table Ranking(
idRanking int auto_increment,
macAddressServidor  varchar(17) not null,
tipoComponente varchar(15) not null,
periodoInicio datetime not null,
periodoFim datetime not null,
ocorrencia int not null,
primary key (idRanking),
foreign key (macAddressServidor) references Servidor(macAddress)
);

#Criar um separador para todos os componentes que estiverem em estado: "estável", "alerta" ou "em risco"
Create table EstadoComponentes(
idEstado int auto_increment primary key,
idComponenteEST int not null,
macAddressServidor varchar(17) not null,
estadoAtual varchar(7) not null,
dataHora datetime default current_timestamp,
foreign key (idComponenteEST) references Componentes(idComponente),
foreign key (macAddressServidor) references Servidor(macAddress),
constraint chk_estadoComp check (estadoAtual IN ('ESTÁVEL', 'ALERTA', 'RISCO'))
);

#Criar uma table que pegue todos os alertas recentes
Create table AlertasRecentes(
idAlerta int auto_increment primary key,
idComponenteRCT int not null, 
macAddressServidor varchar(17) not null,
componenteNome varchar(15) not null,
motivo char(20) not null, 
dataHora datetime default current_timestamp, 
foreign key (idComponenteRCT) references Componentes(idComponente),
foreign key (macAddressServidor) references Servidor(macAddress),
constraint chk_estadoRCT check (motivo IN ('ACIMA DA MÉDIA', 'ABAIXO DA MÉDIA'))
);

create table Alerta (
	idAlerta int auto_increment,
    fkIdServidor VARCHAR(17) NOT NULL,
    PRIMARY KEY(idAlerta, fkIdServidor),
    componenteNome VARCHAR(15) NOT NULL,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo CHAR(20) NOT NULL,
    estadoAtual VARCHAR(7) NOT NULL,
    CONSTRAINT fkServComponente FOREIGN KEY(fkIdServidor) REFERENCES Servidor(macAddress),
    CONSTRAINT chk_comp CHECK (componenteNome IN ('CPU', 'RAM', 'DISCO', 'LATÊNCIA', 'REDE')),
    CONSTRAINT chk_mtv CHECK (motivo IN ('ACIMA DA MÉDIA', 'ABAIXO DA MÉDIA')),
    CONSTRAINT chk_estd CHECK (estadoAtual IN ('ESTÁVEL', 'ALERTA', 'RISCO'))
);

select * from Servidor;








#SELECTS ALERTA::::
# Select Ranking
SELECT fkIdServidor AS Servidor, componenteNome AS Componente, motivo AS Motivo, DATE(DataHora) AS Data,
COUNT(*) AS Quantidade
FROM Alerta
GROUP BY fkIdServidor, componenteNome, motivo, DATE(DataHora)
ORDER BY Quantidade DESC, Data DESC;


# Select Qtd Alertas por servidor
SELECT fkIdServidor AS Servidor, componenteNome AS Componente, DATE(DataHora) AS Periodo, COUNT(*) AS TotalAlertas
FROM Alerta
GROUP BY fkIdServidor, componenteNome, DATE(DataHora)
ORDER BY Periodo DESC, Servidor, Componente;

# Select que pega componente por estado (ALERTA)
SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress, 
COUNT(*) AS Total
FROM Alerta
WHERE estadoAtual = 'ALERTA'
GROUP BY componenteNome, estadoAtual, fkIdServidor, motivo, DataHora, idAlerta
ORDER BY Componente;

# Select que pega componente por estado (RISCO)
SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress,
COUNT(*) AS Total
FROM Alerta
WHERE estadoAtual = 'RISCO'
GROUP BY componenteNome, estadoAtual, fkIdServidor, motivo, DataHora, idAlerta
ORDER BY Componente;

# Select que mostra os alertas gerados nas ultimas 24H
SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress
FROM Alerta
WHERE DataHora >= NOW() - INTERVAL 1 DAY
ORDER BY DataHora DESC;

# Select que mostra todos os alertas já gerados
SELECT estadoAtual AS Categoria, componenteNome AS Componente, fkIdServidor AS Servidor, motivo AS Motivo, DataHora, idAlerta, fkIdServidor AS MacAddress
FROM Alerta
ORDER BY DataHora DESC;
