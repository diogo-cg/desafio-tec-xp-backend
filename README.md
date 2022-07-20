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

CREATE TABLE investxp.conta (
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  saldo DECIMAL (12,2)
);

CREATE TABLE investxp.depositos (
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  valor DECIMAL (7,2)
);

CREATE TABLE investxp.saques (
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  valor DECIMAL (7,2)
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

INSERT INTO investxp.depositos (codCliente, valor)
VALUES ('1','1000'),
('1','3000'),
('1','500'),
('2','1800'),
('2','1300'),
('3','1500'),
('3','2100'),
('4','800'),
('4','700'),
('5','1200');

INSERT INTO investxp.conta (codCliente, saldo)
VALUES ('1','50000'),
('2','30000'),
('3','10000'),
('4','80000'),
('5','30000');

INSERT INTO investxp.saques (codCliente, valor)
VALUES ('1','500'),
('1','300'),
('1','100'),
('2','800'),
('2','300'),
('3','500'),
('3','100'),
('4','300'),
('4','200'),
('5','200');