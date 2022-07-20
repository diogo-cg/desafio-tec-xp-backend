import { Request, Response } from 'express';
import accountService from '../services/account.services';

const getBalanceById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const balance = await accountService.getBalanceById(id);
  return res.status(200).json(balance);
}

const addBalance = async (req: Request, res: Response): Promise<Response> => {
  await accountService.addBalance(req.body.id, req.body.valor);
  const { valor } = req.body;
  return res.status(201).json({ message: `R$ ${valor} adicionados a conta` });
};

const removeBalance = async (req: Request, res: Response): Promise<Response> => {
  await accountService.addBalance(req.body.id, req.body.valor);
  const { valor } = req.body;

  return res.status(201).json({ message: `R$ ${valor} sacados da conta` });
};
export default { addBalance, removeBalance, getBalanceById };
