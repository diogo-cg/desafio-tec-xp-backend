import { Request, Response } from 'express';
import assetService from '../services/asset.services';


const getAssetById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const asset = await assetService.getAssetById(id);
  return res.status(200).json(asset);
}

const getClientAssets = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const assets = await assetService.getClientAssets(id);
  return res.status(200).json(assets);
}

export default { getAssetById, getClientAssets };
