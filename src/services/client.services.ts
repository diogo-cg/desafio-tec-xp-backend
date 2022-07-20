import IClient from '../interfaces/client.interface';
import clientModel from '../models/client.model';

const getClientById = (id: number): Promise<IClient> => {
  return clientModel.getClientById(id);
}

const updateSaldo = async (saldo:number, client: IClient): Promise<IClient> => {
  await clientModel.updateSaldo(saldo, client);
  const newClient = client;
  return newClient;
};

export default { getClientById, updateSaldo };