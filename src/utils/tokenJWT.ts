import jwt, { SignOptions } from 'jsonwebtoken';
import IClient from '../interfaces/client.interface';
import HttpException from './http.exception';

const SECRET = process.env.JWT_SECRET || 'senhaSuperSecreta';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      jwtConfig = jwtDefaultConfig;
    }
  }

  public generateJWTToken(payload: IClient) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Token não encontrado');
    }
    try {
      const introspection = await jwt.verify(token, SECRET, this.jwtConfig);
      return introspection;
    } catch (e) {
      new HttpException(401, 'Token inválido');
    }
  }
}

export default TokenGenerator;
