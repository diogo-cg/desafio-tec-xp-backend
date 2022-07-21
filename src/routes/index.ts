import { Router } from 'express';
import accountController from '../controllers/account.controller';
import activeController from '../controllers/active.controller';

require('express-async-errors');

const router = Router();

router.get('/ativos/:id', activeController.getActiveById);
router.post('/conta/deposito', accountController.addValue);
router.post('/conta/saque', accountController.subValue);
router.get('/conta/:id', accountController.getBalanceByClient);

export default router;
