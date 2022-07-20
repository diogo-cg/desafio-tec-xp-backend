import IClient from '../interfaces/client.interface';
import connection from './connection';

const getClientById = async (id: number): Promise<IClient> => {
  const [rows] = await connection.execute(
      'SELECT * FROM investxp.clientes WHERE id = ?', [id],
  );
  const [client] = rows as IClient[];
  return client as IClient;
}

export default { getClientById };
