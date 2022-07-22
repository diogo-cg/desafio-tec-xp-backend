import { Router } from 'express';
import accountController from '../controllers/account.controller';
import assetController from '../controllers/asset.controller';
import walletController from '../controllers/wallet.controller';

require('express-async-errors');

const router = Router();

router.post('/investimentos/comprar', assetController.buyAsset);
router.post('/investimentos/vender', assetController.sellAsset);
router.get('/ativos/cliente/:id', walletController.getClientWallet);
router.get('/ativos/:id', assetController.getAssetById);
router.post('/conta/deposito', accountController.addValue);
router.post('/conta/saque', accountController.subValue);
router.get('/conta/:id', accountController.getBalanceByClient);

export default router;
