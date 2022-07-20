import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const addBalance = async (id: number, valor: number) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO investxp.depositos (codCliente, valor) VALUES (?, ?) ',
    [id, valor],
  );
  return result;
};

const removeBalance = async (id: number, valor: number) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO investxp.saques (codCliente, valor) VALUES (?, ?) ',
    [id, valor],
  );
  return result;
};

const getBalanceById = async (id: number) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'SELECT * FROM investxp.conta WHERE codCliente = ?', [id]
  );
  return result;
};

export default { addBalance, removeBalance, getBalanceById };
