import { Request, Response } from 'express';
import walletService from '../services/wallet.services';

const getClientWallet = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const assets = await walletService.getClientWallet(id);
  return res.status(200).json(assets);
}

export default { getClientWallet }