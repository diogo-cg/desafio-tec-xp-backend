import HttpException from '../utils/http.exception';
import TokenGenerator from '../utils/tokenJWT';
import IClient from '../interfaces/client.interface';
import clientServices from './client.services';

const authentication = async (clientLogin: IClient) => {
  if (!clientLogin.login || !clientLogin.password) {
    throw { status: 401, message: 'Campos faltantes.' };
  }
  const client = await clientServices.getMatchClient(clientLogin);
  if (!client) {
    throw new HttpException(401, 'Usuário ou senha inválido');
  }
  const jwtHeader: IClient = {
    login: client.login,
    id: client.id,
  };
  const tokenGenerator = new TokenGenerator();
  const token = tokenGenerator.generateJWTToken(jwtHeader);
  return { token };
};

export default { authentication };
