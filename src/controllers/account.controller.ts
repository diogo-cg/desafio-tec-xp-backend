import { Request, Response } from 'express';
import accountService from '../services/account.services';

const getBalanceByClient = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const balance = await accountService.getBalanceByClient(id);
  return res.status(200).json(balance);
};

const addValue = async (req: Request, res: Response): Promise<Response> => {
  await accountService.addValue(req.body);
  const { valor } = req.body;
  return res.status(201).json({ message: `R$ ${valor} adicionados a conta` });
};

const subValue = async (req: Request, res: Response): Promise<Response> => {
  await accountService.subValue(req.body);
  const { valor } = req.body;
  return res.status(201).json({ message: `R$ ${valor} sacados da conta` });
};
export default { addValue, subValue, getBalanceByClient };
