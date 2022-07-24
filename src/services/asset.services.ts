import IAsset from '../interfaces/asset.interface';
import IBrokerAsset from '../interfaces/brokerAsset.interface';
import accountModel from '../models/account.model';
import assetModel from '../models/asset.model';
import walletModel from '../models/wallet.model';
import HttpException from '../utils/http.exception';

const getAssetById = (id: number): Promise<IBrokerAsset> => {
  const asset = assetModel.getAssetById(id);
  return asset;
}

const buyAsset = async (asset: IAsset ): Promise<IAsset> => {
  const assetClient = await assetModel.getAssetClientWallet(asset);
  const assetAvailableById = await assetModel.getAssetById(asset.codAtivo);
  if (asset.qtdeAtivo > assetAvailableById.qtdeAtivo) throw new HttpException(400, 'Quantidade indisponível na corretora');
  // validado se o cliente nao possuir ativo sera adicionado novo ativo,
  // caso possua o mesmo sera atualizado com a nova quantidade
  const buyValue = (+asset.qtdeAtivo * +assetAvailableById.valor);
  if (assetClient) { 
    await assetModel.buyAsset(asset);
  // removida quantidade vendida a quantidade disponível na corretora e removido valor da compra do saldo do cliente;
  asset.valor = assetAvailableById.valor;
  await assetModel.removeBrokerAsset(asset.qtdeAtivo, asset.codAtivo);
  await accountModel.subBalance(asset.codClient, buyValue);
  await assetModel.buyHistory(asset);
  return asset;
  }
  await assetModel.buyNewAsset(asset);
  await assetModel.removeBrokerAsset(asset.qtdeAtivo, asset.codAtivo);
  await accountModel.subBalance(asset.codClient, buyValue);
  await assetModel.buyHistory(asset);
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
  asset.valor = clientAssetWallet.valor;
  await assetModel.sellHistory(asset);
  await assetModel.sellAsset(asset);
  // adicionado quantidade vendida a quantidade disponível na corretora;
  await assetModel.addBrokerAsset(asset.qtdeAtivo, asset.codAtivo);
  return asset;
}

export default { getAssetById, buyAsset, sellAsset };
