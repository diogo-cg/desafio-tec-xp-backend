import IClient from '../interfaces/client.interface';
import clientModel from '../models/client.model';

const getClientById = (id: number): Promise<IClient> => {
  return clientModel.getClientById(id);
}

export default { getClientById };
