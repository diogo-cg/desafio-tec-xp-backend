import { Router } from 'express';
import accountController from '../controllers/account.controller';
import clientController from '../controllers/client.controller';

require('express-async-errors');

const router = Router();

router.get('/:id', clientController.getClientById);
router.post('/:conta/deposito', accountController.addBalance);
router.post('/:conta/saque', accountController.removeBalance);
router.get('/:conta/:id', accountController.getBalanceById);

export default router;
