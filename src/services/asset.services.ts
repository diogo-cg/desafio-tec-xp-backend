import IAsset from '../interfaces/asset.interface';
import accountModel from '../models/account.model';
import assetModel from '../models/asset.model';
import walletModel from '../models/wallet.model';
import HttpException from '../utils/http.exception';

const getAssetById = (id: number): Promise<IAsset> => {
  const asset = assetModel.getAssetById(id);
  return asset;
}

const buyAsset = async (asset: IAsset ): Promise<IAsset> => {
  const assetClient = await assetModel.getAssetClientWallet(asset);
  // validado se o cliente nao possuir ativo sera adicionado novo ativo,
  // caso possua o mesmo sera atualizado com a nova quantidade
  if (assetClient) { const { insertId } = await assetModel.buyAsset(asset);
  asset.codClient = insertId;
  return asset;
  } const { insertId } = await assetModel.buyNewAsset(asset);
  asset.codClient = insertId;
  return asset;
}

const sellAsset = async ( asset: IAsset): Promise<IAsset> => {
  const clientAssetWallet = await walletModel.getClientWalletByAsset(asset);
  // validado se o cliente possui o ativo
  if (!clientAssetWallet) throw new HttpException(400, 'Ativo não encontrado na carteira do Cliente');
  // validado se o cliente possui a quantidade necessária do ativo na carteira
  if (clientAssetWallet.qtdeAtivo < asset.qtdeAtivo) throw new HttpException(400, 'O Cliente não possui ativos suficientes na carteira');
  const sellValue = (+clientAssetWallet.qtdeAtivo * +clientAssetWallet.valor);
  // adicionado valor da venda do ativo no saldo do cliente;
  await accountModel.addBalance(asset.codClient, sellValue);
  const { insertId } = await assetModel.sellAsset(asset);
  asset.codClient = insertId;
  return asset;
}

export default { getAssetById, buyAsset, sellAsset };
