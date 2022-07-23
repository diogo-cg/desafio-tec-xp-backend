import IAccount from '../interfaces/account.interface';
import ITransaction from '../interfaces/transaction.interface';
import accountModel from '../models/account.model';
import HttpException from '../utils/http.exception';

const addValue = async (deposito: ITransaction): Promise<ITransaction> => {
  if (deposito.valor <= 0) {
    throw new HttpException(400, 'Quantidade a ser depositada não pode ser negativa ou igual a zero.');
  }
  const account = await getBalanceByClient(deposito.codCliente);
  if (!account) throw new HttpException(400, 'Conta de cliente nao encontrada');
  await accountModel.addBalance(account.id, deposito.valor);
  const { insertId } = await accountModel.addValue(deposito.codCliente, deposito.valor);
  deposito.id = insertId;
  return deposito;
};
const subValue = async (saque: ITransaction): Promise<ITransaction> => {
  if (saque.valor <= 0) {
    throw new HttpException(400, 'Quantidade a ser sacada não pode ser negativa ou igual a zero.');
  }
  const account = await getBalanceByClient(saque.codCliente);
  if (!account) throw new HttpException(400, 'Conta de cliente nao encontrada');
  if (+account.saldo < +saque.valor) throw new HttpException(400, 'Saldo insuficiente em conta para saque');
  await accountModel.subBalance(account.id, saque.valor);
  const { insertId } = await accountModel.addValue(saque.codCliente, saque.valor);
  saque.id = insertId;
  return saque;
};

const getBalanceByClient = (id: number):Promise<IAccount> => {
  const balance = accountModel.getBalanceByClient(id);
  return balance;
}

export default { addValue, subValue, getBalanceByClient };
