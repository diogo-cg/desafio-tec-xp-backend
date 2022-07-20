# desafio-tec-xp-backend
Repositório criado para o desafio técnico da XP ( Back end)

# COMANDOS PARA CRIAR DO BANCO DE DADOS E TABELAS

DROP SCHEMA IF EXISTS investxp;
CREATE SCHEMA investxp;

CREATE TABLE investxp.clientes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  login TEXT NOT NULL,
  password TEXT NOT NULL,
  saldo DECIMAL (12,2)
);

CREATE TABLE investxp.ativos (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  qtde INTEGER,
  valor DECIMAL (6,2) NOT NULL
);

CREATE TABLE investxp.carteira (
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  codAtivo INTEGER,
  FOREIGN KEY (codAtivo) REFERENCES investxp.ativos (Id),
  qtdeAtivo INTEGER
);

# POPULANDO BANCO DE DADOS

INSERT INTO investxp.clientes (login, password, saldo)
VALUES ( 'joao', 'senha123456', '10000'),
( 'maria', 'd41sad1as', '20000'),
( 'jose', 'dfdaf4f4d', '30000'),
( 'mateus', 'lasghag61681', '40000'),
( 'joana', '45mmg41jmh41', '50000');

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