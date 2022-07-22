import IAsset from "../interfaces/asset.interface";
import connection from './connection';

const getClientWallet = async(id:number): Promise<IAsset[]> => {
  const [result] = await connection.execute(
    `SELECT ca.codCliente, ca.codAtivo, ca.qtdeAtivo, a.valor
    FROM investxp.carteiras ca 
    JOIN investxp.ativos a on ca.codAtivo = a.id 
    WHERE codCliente = ?;`,[id],
);
return result as IAsset[];
}

const getClientWalletByAsset = async(assets: IAsset): Promise<IAsset> => {
  const [result] = await connection.execute(
    `SELECT ca.codCliente, ca.codAtivo, ca.qtdeAtivo, a.valor
    FROM investxp.carteiras ca 
    JOIN investxp.ativos a on ca.codAtivo = a.id 
    WHERE codCliente = ? and codAtivo = ? ;`,[assets.codClient, assets.codAtivo],
);
const [asset] = result as IAsset[];
return asset as IAsset;
}

export default { getClientWallet, getClientWalletByAsset }