import { ResultSetHeader } from 'mysql2';
import IClient from '../interfaces/client.interface';
import connection from './connection';

const getClientById = async (id: number): Promise<IClient> => {
  const [rows] = await connection.execute(
      'SELECT * FROM investxp.clientes WHERE id = ?', [id],
  );
  const [client] = rows as IClient[];
  return client as IClient;
}

const updateSaldo = async (saldo: number ,client : IClient): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>( 
    'UPDATE investxp.clientes SET saldo = (?) WHERE id = (?) ',
    [saldo, client.id],
  );
  return result;
};

export default { getClientById, updateSaldo }; 