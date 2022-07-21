import { Request, Response } from 'express';
import clientService from '../services/client.services';


const getClientById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const client = await clientService.getClientById(id);

  return res.status(200).json(client);
}

export default { getClientById };
