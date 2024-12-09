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

create table Alerta (
	idAlerta int auto_increment,
    fkIdServidor VARCHAR(17),
    PRIMARY KEY(idAlerta, fkIdServidor),
    componenteNome VARCHAR(15) NOT NULL,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo CHAR(20) NOT NULL,
    estadoAtual VARCHAR(7) NOT NULL,
    CONSTRAINT fkServComponente FOREIGN KEY(fkIdServidor) REFERENCES Servidor(macAddress),
    CONSTRAINT chk_comp CHECK (componenteNome IN ('CPU', 'RAM', 'DISCO', 'LATENCIA', 'REDE')),
    CONSTRAINT chk_mtv CHECK (motivo IN ('ACIMA DA MEDIA', 'ABAIXO DA MEDIA')),
    CONSTRAINT chk_estd CHECK (estadoAtual IN ('ALERTA', 'RISCO'))
);

CREATE VIEW ResumoSemanalMedias AS
SELECT
    fkMaquina,
    DATE_SUB(dia, INTERVAL DAYOFWEEK(dia) - 1 DAY) AS semana,
    ROUND(AVG(cpuPorc), 1) AS cpuPorc,
    ROUND(AVG(memoriaPorc), 1) AS memoriaPorc,
    ROUND(AVG(memoriaGb), 1) AS memoriaGb,
    ROUND(AVG(memoriaTotal), 0) AS memoriaTotal,
    ROUND(AVG(discoPorc), 1) AS discoPorc,
    ROUND(AVG(discoGb), 1) AS discoGb,
    ROUND(AVG(discoTotal), 0) AS discoTotal,
    ROUND(AVG(mbpsRecebidos), 0) AS mbpsRecebidos,
    ROUND(AVG(mbpsEnviados), 0) AS mbpsEnviados,
    ROUND(AVG(latencia), 1) AS latencia
FROM DadosServidorMedia
GROUP BY semana, fkMaquina
ORDER BY MIN(dia);


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

insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('f946307321c2', 1, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('14857f833746', 2, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('d09466c9be45', 3, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('c7d12465a943', 4, 1);

INSERT INTO Usuario(nome, email, senha, cpf, telefone, cargo, fkEmpresa) VALUES 
("Jamal", "jamal@gmail.com", "1234567", "55544433321", "11999998888", "Gerente", 1),
("José Carlos", "jose_carlos@gmail.com", "1234567", "99988877764", "11949498585", "Técnico", 1);


insert into Alerta (fkIdServidor, componenteNome, DataHora, motivo, estadoAtual) values
('f946307321c2', 'CPU', '2024-12-02 10:15:00', 'ACIMA DA MEDIA', 'ALERTA'), 
('14857f833746', 'RAM', '2024-12-02 10:30:00', 'ABAIXO DA MEDIA', 'RISCO'), 
('d09466c9be45', 'DISCO', '2024-12-02 11:00:00', 'ACIMA DA MEDIA', 'ALERTA'), 
('c7d12465a943', 'LATENCIA', '2024-12-02 11:45:00', 'ABAIXO DA MEDIA', 'RISCO'), 
('f946307321c2', 'REDE', '2024-12-02 12:00:00', 'ACIMA DA MEDIA', 'ALERTA');