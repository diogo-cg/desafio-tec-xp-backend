import IClient from '../interfaces/client.interface';
import clientModel from '../models/client.model';

const getClientById = (id: number): Promise<IClient> => clientModel.getClientById(id);

const getMatchClient = (client: IClient): Promise<IClient> => {
  const clients = clientModel.getMatchClient(client);
  return clients;
};

export default { getClientById, getMatchClient };
