import { Request, Response } from 'express';
import assetService from '../services/asset.services';

const getAssetById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const asset = await assetService.getAssetById(id);
  return res.status(200).json(asset);
};

const buyAsset = async (req: Request, res: Response): Promise<Response> => {
  const asset = await assetService.buyAsset(req.body);
  return res.status(201).json(asset);
};

const sellAsset = async (req: Request, res: Response): Promise<Response> => {
  const asset = await assetService.sellAsset(req.body);
  return res.status(201).json(asset);
};

export default { getAssetById, buyAsset, sellAsset };
