import { Router } from 'express';
import accountController from '../controllers/account.controller';
import assetController from '../controllers/asset.controller';

require('express-async-errors');

const router = Router();

router.get('/ativos/cliente/:id', assetController.getClientAssets);
router.get('/ativos/:id', assetController.getAssetById);
router.post('/conta/deposito', accountController.addValue);
router.post('/conta/saque', accountController.subValue);
router.get('/conta/:id', accountController.getBalanceByClient);

export default router;
