import { Router } from 'express';
import accountController from '../controllers/account.controller';
import assetController from '../controllers/asset.controller';
import walletController from '../controllers/wallet.controller';
import authController from "../controllers/auth.controller";
import validateToken from '../middleware/auth.middleware';

require('express-async-errors');

const router = Router();

router.post('/auth', authController.authentication);
router.post('/investimentos/comprar', validateToken, assetController.buyAsset);
router.post('/investimentos/vender', validateToken, assetController.sellAsset);
router.get('/ativos/cliente/:id', validateToken, walletController.getClientWallet);
router.get('/ativos/:id', validateToken, assetController.getAssetById);
router.post('/conta/deposito', validateToken, accountController.addValue);
router.post('/conta/saque', validateToken, accountController.subValue);
router.get('/conta/:id', validateToken, accountController.getBalanceByClient);

export default router;
