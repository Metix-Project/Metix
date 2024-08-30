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
    CpuPorc decimal(7, 2) not null,
    MemoriaPorc decimal(7, 2) not null,
    DiscoPorc decimal(7, 2) not null,
    CpuByte int not null,
    MemoriaByte int not null,
    DiscoByte int not null,
    tempCpu decimal(7, 2),
    tempMemoria decimal(7, 2),
    dataHora datetime not null default current_timestamp,
    pontoDeControle int not null
);
