import { Request, Response } from 'express';
import activeService from '../services/active.services';


const getActiveById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const active = await activeService.getActiveById(id);
  return res.status(200).json(active);
}

export default { getActiveById };
