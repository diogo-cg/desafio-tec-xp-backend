import IAsset from '../interfaces/asset.interface';
import connection from './connection';

const getAssetById = async (id: number): Promise<IAsset> => {
  const [result] = await connection.execute(
      'SELECT * FROM investxp.ativos WHERE id = ?', [id],
  );
  const [asset] = result as IAsset[];
  return asset as IAsset;
}

const getClientAssets = async(id:number): Promise<IAsset[]> => {
  const [result] = await connection.execute(
    `SELECT ca.codCliente, ca.codAtivo, ca.qtdeAtivo, a.valor
    FROM investxp.carteira ca 
    JOIN investxp.ativos a on ca.codAtivo = a.id 
    WHERE codCliente = ?;`,[id],
);
return result as IAsset[];
}

export default { getAssetById, getClientAssets };
