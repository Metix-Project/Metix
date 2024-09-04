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
		id int auto_increment,
    macAddress char(17) not null unique,
    pontoDeControle int not null,
    fkEmpresa int not null,

    primary key (id, fkEmpresa),
    constraint ServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table Componente(
		id int auto_increment,
    nome varchar(80)
    capacidadeMaxima decimal(7, 2) not null,
    unidadedMedida char(15) not null,
    fkEmpresa int not null,
    fkServidor int not null,

    primary key (id, fkEmpresa, fkServidor),
    constraint DadosServidorFkServidor foreign key (fkServidor) references Servidor(id),
    constraint DadosServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id)
);
create table DadosServidor(
		id int auto_increment,
    dataHora datetime not null,
    gastoAtual decimal(7, 2) not null,
    porcentagem decimal(6, 2) not null,
    temperatura decimal(7, 2) not null,
    fkEmpresa int not null,
    fkServidor int not null,
    fkComponente int not null,

    primary key (id, fkEmpresa, fkServidor, fkComponente),
    constraint DadosServidorFkEmpresa foreign key (fkEmpresa) references Empresa(id),
    constraint DadosServidorFkServidor foreign key (fkServidor) references Servidor(id),
    constraint DadosServidorFkComponente foreign key (fkComponente) references Componente(id)
);
