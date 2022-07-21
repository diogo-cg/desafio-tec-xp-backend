import IActive from '../interfaces/active.interface';
import activeModel from '../models/active.model';

const getActiveById = (id: number): Promise<IActive> => {
  const active = activeModel.getActiveById(id);
  return active;
}

export default { getActiveById };
