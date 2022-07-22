# desafio-tec-xp-backend
Repositório criado para o desafio técnico da XP ( Back end)

# COMANDOS PARA CRIAR DO BANCO DE DADOS E TABELAS INICIAIS(MYSQL)

DROP SCHEMA IF EXISTS investxp;
CREATE SCHEMA investxp;

CREATE TABLE investxp.clientes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  login TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE investxp.ativos (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  qtde INTEGER,
  valor DECIMAL (6,2) NOT NULL
);

CREATE TABLE investxp.contas (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  saldo DECIMAL (12,2)
);

CREATE TABLE investxp.depositos (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  valor DECIMAL (7,2)
);

CREATE TABLE investxp.saques (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  valor DECIMAL (7,2)
);

CREATE TABLE investxp.carteiras (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  codAtivo INTEGER,
  FOREIGN KEY (codAtivo) REFERENCES investxp.ativos (Id),
  qtdeAtivo INTEGER
);

CREATE TABLE investxp.compras (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  codAtivo INTEGER NOT NULL,
  FOREIGN KEY (codAtivo) REFERENCES investxp.ativos (Id),
  qtdeAtivo INTEGER
);

CREATE TABLE investxp.vendas (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  codAtivo INTEGER NOT NULL,
  FOREIGN KEY (codAtivo) REFERENCES investxp.ativos (Id),
  qtdeAtivo INTEGER
);

# POPULANDO BANCO DE DADOS

INSERT INTO investxp.clientes (login, password)
VALUES ( 'joao', 'senha123456'),
( 'maria', 'd41sad1as'),
( 'jose', 'dfdaf4f4d'),
( 'mateus', 'lasghag61681'),
( 'joana', '45mmg41jmh41');

INSERT INTO investxp.ativos (qtde, valor)
VALUES ('1000', '0.82'),
('8000', '0.31'),
('5000', '1.76'),
('6800', '0.55'),
('7500', '2.55'),
('3200', '3.81'),
('1000', '4.62'),
('2000', '5.89'),
('2500', '10.53'),
('1300', '20.05');

INSERT INTO investxp.contas (codCliente, saldo)
VALUES ('1','50000'),
('2','30000'),
('3','10000'),
('4','80000'),
('5','30000');

INSERT INTO investxp.carteiras (codCliente, codAtivo, qtdeAtivo)
VALUES ('1', '5', '153'),
('1', '3', '54'),
('1', '9', '89'),
('1', '4', '211'),
('2', '5', '113'),
('2', '10', '81'),
('2', '9', '92'),
('3', '8', '100'),
('3', '7', '154'),
('4', '6', '65'),
('4', '5', '78'),
('5', '4', '108'),
('5', '3', '205'),
('5', '2', '169')
