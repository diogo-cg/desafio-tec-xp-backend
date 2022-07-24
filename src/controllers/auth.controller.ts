import { Request, Response } from 'express';
import authService from "../services/auth.service";

const authentication = async (req: Request, res: Response): Promise<Response> => {
  const token = await authService.authentication(req.body);
  return res.status(200).json(token);
};

export default { authentication };
