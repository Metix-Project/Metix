create database Metix;
use Metix;

create table Empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(80) not null,
    nomeFantasia varchar(80),
    emailEmpresa varchar(80) not null unique,
    cnpj char(18) not null unique,
    telefoneEmpresa char(19) not null unique,
    imgLogo VARCHAR(255)
);

create table Usuario(
	idUsuario int auto_increment,
    nome varchar(80) not null,
    email varchar(80) not null unique,
    senha varchar(80) not null,
    cpf char(14) not null unique,
    telefoneEmpresa char(19) not null unique,
    cargo char(15) not null,
    fkEmpresa int not null,

    primary key (idUsuario, fkEmpresa),
    constraint UsuarioFkEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Servidor(
id int auto_increment,
    macAddress char(17) not null unique,
    pontoDeControle int not null,
    fkEmpresa int not null,

    primary key (id, fkEmpresa),
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table DadosServidor(
macAddress varchar(17) not null,
    cpuPorc decimal(7, 2) not null,
    memoriaPorc decimal(7, 2) not null,
    discoPorc decimal(7, 2) not null,
    cpuAbs int not null,
    memoriaAbs int not null,
    discoAbs int not null,
    MbpsEnviados decimal(7, 2),
	MbpsRecebidos decimal(7, 2),
    TotalMbps decimal(7,2),
	Latencia decimal(7,2),
    dataHora datetime not null default current_timestamp,
    pontoDeControle int not null
);

create user if not exists 'metixAdm'@'%' identified by 'sptech';
grant all privileges on Metix.* to 'metixAdm'@'%';

create user if not exists 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUser'@'%';

create user if not exists 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

-- drop user 'metixUserSelect'@'%';
create user if not exists 'metixUserSelect'@'%' identified by 'sptech';
grant select on Metix.* to 'metixUserSelect'@'%';

insert into Empresa (idEmpresa, razaoSocial, nomeFantasia, emailEmpresa, cnpj, telefoneEmpresa, imgLogo) values (
	1, 
	"Banco Central do Brasil", 
	"Banco Central do Brasil", 
	"bc@br.br", 
	"12345678901234",  
	"1234567890123", 
	"https://avatars.githubusercontent.com/u/16822015?s=200&v=4"
);

insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('10f60a853491', 1, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('e8fb1cd57ab6', 2, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('d09466c9be45', 3, 1);
insert into Servidor (macAddress, pontoDeControle, fkEmpresa) VALUES ('c7d12465a943', 3, 1);
