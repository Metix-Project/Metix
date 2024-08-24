drop database if exists Metix;
create database Metix;

use Metix;

create table Empresa(
		id int primary key auto_increment,
    razaoSocial varchar(80) not null,
    nomeFantasia varchar(80),
    email varchar(80) not null unique,
    cnpj char(18) not null unique,
    telefone char(19) not null unique
);
create table Usuario(
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
create table Servidor(
		id int primary key auto_increment,
    macAddress char(17) not null unique,
    pontoDeControle int not null,
    fkEmpresa int not null,
    
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table DadosServidor(
		macAddress varchar(17) not null,
    dadosCpu decimal(7, 2) not null,
    dadosMemoria decimal(7, 2) not null,
    dadosDisco decimal(7, 2) not null,
    tempCpu decimal(7, 2) not null,
    tempMemoria decimal(7, 2) not null,
    dataHora datetime not null default current_timestamp
);
