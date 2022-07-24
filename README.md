# desafio-tec-xp-backend
Repositório criado para o desafio técnico da XP INC. ( Back end)

Este repositório foi criado para criação de uma API de investimentos afim de atender aos desafios propostos pela XP INC.

# COMANDOS PARA CRIAR DO BANCO DE DADOS E TABELAS INICIAIS (MYSQL)

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
  qtdeAtivo INTEGER,
  valor DECIMAL (6,2) NOT NULL
);

CREATE TABLE investxp.vendas (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  codCliente INTEGER,
  FOREIGN KEY (codCliente) REFERENCES investxp.clientes (Id),
  codAtivo INTEGER NOT NULL,
  FOREIGN KEY (codAtivo) REFERENCES investxp.ativos (Id),
  qtdeAtivo INTEGER,
  valor DECIMAL (6,2) NOT NULL
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

# Instalando pacotes iniciais

NPM INSTALL

# Configurando .env

Na pasta src do repositório possui um arquivo chamado '.env.example o mesmo deverá ser modificado para .env e 
os atributos DATABASE_USER='seu usuário do MYSQL' e DATABASE_PASS='sua senha do MYSQL' deverão ser modificados colocando os valores de usuário e senha do MYSQL de quem clonar o repositório.


# ROTAS

Rota POST '/auth'
Esta rota serve para o cliente logar e assim conseguir o token para ter permissão para as outras rotas

Parâmetros de entrada são o login e senha que deverão ser passados pelo body da seguinte forma:

Exemplo de login e senha que sao válidos na database:

ENTRADA:

{
  "login": "joao",
  "password": "senha123456"
}

SAIDA:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1hcmlhIiwiaWQiOjIsImlhdCI6MTY1ODY4NjYyN30.Rmfi9XeomqASxMIQtRh1c3Lmet6hQjRcynGSN1tnZZE"
}

LEMBRANDO QUE TODAS AS ROTAS ABAIXO DEVERÃO POSSUIR EM SEU HEADER A CHAVE AUTHORIZATION COM O VALOR DO TOKEN GERADO.

Rota GET '/conta/:id'
Esta rota serve para verificar a o saldo do cliente na corretora.

Parâmetros de entrada é o o Código único do cliente(codCliente) que devera ser passado na URL.

SAIDA:

{
  "codCliente": 1,
  "saldo": "60390.15"
}

Rota POST '/conta/deposito'
Esta rota serve para adicionar valor ao saldo do cliente na corretora.

Parâmetros de entrada são o Código único do cliente(codCliente) e o valor a ser depositado que deverão ser passados pelo body.

ENTRADA:

{
  "codCliente": 1,
  "valor": "40000.00"
}

SAIDA:

{
  "message": "R$ 40000.00 adicionados a conta"
}

Rota POST '/conta/saque'
Esta rota serve para remover valor ao saldo do cliente na corretora.

Parâmetros de entrada são o Código único do cliente(codCliente) e o valor a ser sacado que deverão ser passados pelo body.

ENTRADA:

{
  "codCliente": 1,
  "valor": "40000.00"
}

SAIDA:

{
  "message": "R$ 40000.00 sacados da conta"
}

Rota GET '/ativos/:id'
Esta rota serve para verificar a quantidade disponível de certo ativo na corretora.

Parâmetros de entrada é o Código único do ativo(codCAtivo) que será passado junto a URL.

SAIDA:

{
  "codAtivo": 5,
  "qtdeAtivo": 2510,
  "valor": "2.55"
}

Rota GET '/ativos/cliente/:id'
Esta rota serve para verificar as quantidades de ativos que um cliente possui em sua carteira.

Parâmetros de entrada é o Código único do cliente(codCliente) que será passado junto a URL.

SAIDA:

[
  {
    "codCliente": 2,
    "codAtivo": 5,
    "qtdeAtivo": 513,
    "valor": "2.55"
  },
  {
    "codCliente": 2,
    "codAtivo": 10,
    "qtdeAtivo": 81,
    "valor": "20.05"
  },
  {
    "codCliente": 2,
    "codAtivo": 9,
    "qtdeAtivo": 92,
    "valor": "10.53"
  }
]

Rota POST '/investimentos/comprar'
Esta rota serve para o cliente conseguir comprar um certo ativo disponível na corretora.

Parâmetros de entrada são o código único do cliente(codCliente), código único do ativo(codCAtivo) e a quantidade a ser comprada pelo cliente que deverão ser passados pelo body.

ENTRADA:

{
  "codClient": 2,
  "codAtivo": 5,
  "qtdeAtivo": 500
}

SAIDA:

{
  "codClient": 2,
  "codAtivo": 5,
  "qtdeAtivo": 500,
  "valor": "2.55"
}
