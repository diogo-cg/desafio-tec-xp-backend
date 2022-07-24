import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/tokenJWT';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const tokenGenerator = new TokenGenerator();
  const payload = await tokenGenerator.authenticateToken(token);
  res.locals.payload = payload;
  if (!payload) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
  next();
};

export default validateToken;
