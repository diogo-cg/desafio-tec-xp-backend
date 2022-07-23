import { ResultSetHeader } from 'mysql2';
import IAsset from '../interfaces/asset.interface';
import IBrokerAsset from '../interfaces/brokerAsset.interface';
import connection from './connection';

const getAssetById = async (id: number): Promise<IBrokerAsset> => {
  const [result] = await connection.execute(
      'SELECT id AS codAtivo, qtde AS qtdeAtivo, valor FROM investxp.ativos WHERE id = ?', [id]);
  const [asset] = result as IAsset[];
  return asset as IAsset;
}

const addBrokerAsset = async(qtdeAtivo:number, codAtivo:number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE investxp.ativos SET qtde = qtde + ? WHERE id = ?;` ,
    [qtdeAtivo, codAtivo]);
return result;
}

const removeBrokerAsset = async(qtdeAtivo:number, codAtivo:number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE investxp.ativos SET qtde = qtde - ? WHERE id = ?;` ,
    [qtdeAtivo, codAtivo]);
return result;
}

const getAssetClientWallet = async (assets:IAsset): Promise<IAsset> => {
  const [result] = await connection.execute(
      'SELECT * FROM investxp.carteiras WHERE codCliente = ? AND codAtivo = ?',
      [assets.codClient, assets.codAtivo]);
  const [asset] = result as IAsset[];
  return asset as IAsset;
}

const buyNewAsset = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investxp.carteiras (codCliente, codAtivo, qtdeAtivo)
    VALUES (?, ?, ?)` ,[asset.codClient, asset.codAtivo, asset.qtdeAtivo]);
return result;
}

const buyAsset = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE investxp.carteiras SET qtdeAtivo = qtdeAtivo + ? WHERE codAtivo = ? AND codCliente = ?;` ,
    [asset.qtdeAtivo, asset.codAtivo, asset.codClient]);
return result;
}

const sellAsset = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE investxp.carteiras SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?;` ,
    [asset.qtdeAtivo, asset.codAtivo, asset.codClient]);
return result;
}

const buyHistory = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investxp.compras (codCliente, codAtivo, qtdeAtivo, valor) VALUES (?, ?, ?, ?)` ,
    [asset.codClient, asset.codAtivo, asset.qtdeAtivo, asset.valor]);
return result;
}

const sellHistory = async(asset: IAsset): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investxp.vendas (codCliente, codAtivo, qtdeAtivo, valor) VALUES (?, ?, ?, ?)` ,
    [asset.codClient, asset.codAtivo, asset.qtdeAtivo, asset.valor]);
return result;
}

export default {
  getAssetById,
  addBrokerAsset,
  removeBrokerAsset,
  getAssetClientWallet,
  buyNewAsset,
  buyAsset,
  sellAsset,
  buyHistory,
  sellHistory
};
