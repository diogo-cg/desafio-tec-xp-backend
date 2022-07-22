import IAsset from '../interfaces/asset.interface';
import assetModel from '../models/asset.model';

const getAssetById = (id: number): Promise<IAsset> => {
  const asset = assetModel.getAssetById(id);
  return asset;
}

const buyAsset = async (asset: IAsset ): Promise<IAsset> => {
  const { insertId } = await assetModel.buyAsset(asset);
  asset.codClient = insertId;
  return asset;
}

const sellAsset = async ( movie: IAsset): Promise<IAsset> => {
  const { insertId } = await assetModel.sellAsset(movie);
  movie.codClient = insertId;
  return movie
}

export default { getAssetById, buyAsset, sellAsset };
