import IAsset from '../interfaces/asset.interface';
import walletModel from '../models/wallet.model';

const getClientWallet = (id:number): Promise<IAsset[]> => {
  const assets = walletModel.getClientWallet(id);
  return assets;
};

export default { getClientWallet };
