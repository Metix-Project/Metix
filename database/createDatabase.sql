create database Metix;

use Metix;

create table Empresa(
		id int primary key auto_increment,
    razaoSocial varchar(80) not null,
    nomeFantasia varchar(80),
    email varchar(80) not null,
    cnpj char(18) not null,
    telefone char(19) not null
);
create table Usuario(
		id int auto_increment,
    nome varchar(80) not null,
    email varchar(80) not null,
    senha varchar(80) not null,
    cpf char(14) not null,
    telefone char(19) not null,
    cargo char(15) not null,
    fkEmpresa int not null,
    
    primary key (id, fkEmpresa),
    constraint UsuarioFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table Servidor(
		id int primary key auto_increment,
    macAddress char(17) not null,
    fkEmpresa int not null,
    
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table DadosServidor(
		id int auto_increment,
    dadosCpu int not null,
    dadosMemoria int not null,
    tempCpu decimal(7, 2) not null,
    tempMemoria decimal(7, 2) not null,
    fkServidor int not null,
    fkServidorEmpresa int not null,

    primary key (id, fkServidorEmpresa, fkServidor),
    constraint DadosServidorFkServidor foreign key (fkServidor) references Servidor(id),
    constraint DadosServidorFkServidorEmpresa foreign key (fkServidorEmpresa) references Empresa(id)
);
