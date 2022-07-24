import { ResultSetHeader } from 'mysql2';
import IAccount from '../interfaces/account.interface';
import connection from './connection';

const addValue = async (id: number, valor: number) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO investxp.depositos (codCliente, valor) VALUES (?, ?) ',
    [id, valor],
  );
  return result;
};

const subValue = async (id: number, valor: number) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO investxp.saques (codCliente, valor) VALUES (?, ?) ',
    [id, valor],
  );
  return result;
};

const getBalanceByClient = async (id: number): Promise<IAccount> => {
  const [result] = await connection.execute('SELECT * FROM investxp.contas WHERE codCliente = ?', [id]);
  const [account] = result as IAccount[];
  return account as IAccount;
};

const addBalance = async (id:number, valor: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>('UPDATE investxp.contas SET saldo = saldo + ? WHERE codCliente = ?', [valor, id]);
  return result;
};

const subBalance = async (id:number, valor: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>('UPDATE investxp.contas SET saldo = saldo - ? WHERE id = ?', [valor, id]);
  return result;
};

export default {
  addBalance, subValue, getBalanceByClient, addValue, subBalance,
};
