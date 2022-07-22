import { ResultSetHeader } from 'mysql2';
import IAsset from '../interfaces/asset.interface';
import connection from './connection';

const getAssetById = async (id: number): Promise<IAsset> => {
  const [result] = await connection.execute(
      'SELECT * FROM investxp.ativos WHERE id = ?', [id],
  );
  const [asset] = result as IAsset[];
  return asset as IAsset;
}

const buyAsset = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investxp.carteiras (codCliente, codAtivo, qtdeAtivo)
    VALUES (?, ?, ?)` ,[asset.codClient, asset.codAtivo, asset.qtdeAtivo],
);
return result;
}

const sellAsset = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE investxp.carteiras SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?;` ,
    [asset.qtdeAtivo, asset.codAtivo, asset.codClient],
);
return result;
}

export default { getAssetById, buyAsset, sellAsset };
