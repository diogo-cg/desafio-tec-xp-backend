import IActive from '../interfaces/active.interface';
import connection from './connection';

const getActiveById = async (id: number): Promise<IActive> => {
  const [rows] = await connection.execute(
      'SELECT * FROM investxp.ativos WHERE id = ?', [id],
  );
  const [ative] = rows as IActive[];
  return ative as IActive;
}

export default { getActiveById };
