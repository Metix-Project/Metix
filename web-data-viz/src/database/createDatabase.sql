create database if not exists Metix;

use Metix;

create table if not exists Empresa(
		id int primary key auto_increment,
    razaoSocial varchar(80) not null,
    nomeFantasia varchar(80),
    email varchar(80) not null unique,
    cnpj char(18) not null unique,
    telefone char(19) not null unique
);
create table if not exists Usuario(
		id int auto_increment,
    nome varchar(80) not null,
    email varchar(80) not null unique,
    senha varchar(80) not null,
    cpf char(14) not null unique,
    telefone char(19) not null unique,
    cargo char(15) not null,
    fkEmpresa int not null,
    
    primary key (id, fkEmpresa),
    constraint UsuarioFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table if not exists Servidor(
		id int auto_increment,
    macAddress char(17) not null unique,
    pontoDeControle int not null,
    fkEmpresa int not null,
    
    primary key (id, fkEmpresa),
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table if not exists DadosServidor(
		macAddress varchar(17) not null,
    cpuPorc decimal(7, 2) not null,
    memoriaPorc decimal(7, 2) not null,
    discoPorc decimal(7, 2) not null,
    cpuAbs int not null,
    memoriaAbs int not null,
    discoAbs int not null,
    dataHora datetime not null default current_timestamp,
    pontoDeControle int not null
);
