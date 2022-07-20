import { Router } from 'express';
import clientController from '../controllers/client.controller';

require('express-async-errors');

const router = Router();

router.get('/:id', clientController.getClientById);
router.put('/conta/deposito', clientController.updateSaldo);

export default router;
