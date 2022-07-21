import IAsset from '../interfaces/asset.interface';
import assetModel from '../models/asset.model';

const getAssetById = (id: number): Promise<IAsset> => {
  const asset = assetModel.getAssetById(id);
  return asset;
}

const getClientAssets = (id:number): Promise<IAsset[]> => {
  const assets = assetModel.getClientAssets(id);
  return assets;
}

export default { getAssetById, getClientAssets };
