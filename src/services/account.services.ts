import accountModel from '../models/account.model';
import HttpException from '../utils/http.exception';

const addBalance = async (id: number, valor: number) => {
  if (valor <= 0) {
    throw new HttpException(400, 'Quantidade a ser depositada não pode ser negativa ou igual a zero.');
  }
  await accountModel.addBalance(id, valor);
};
const removeBalance = async (id: number, valor: number) => {
  if (valor <= 0) {
    throw new HttpException(400, 'Quantidade a ser sacada não pode ser negativa ou igual a zero.');
  }
  await accountModel.removeBalance(id, valor);
};

const getBalanceById = (id: number) => {
  const balance = accountModel.getBalanceById(id);
  return balance;
}

export default { addBalance, removeBalance, getBalanceById };
