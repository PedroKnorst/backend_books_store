import { CreateSalesController } from '#/modules/Sale/useCases/CreateSale/CreateSalesController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';

const salesRoutes = Router();

const createSales = new CreateSalesController();

salesRoutes.use(verifyJWT);

salesRoutes.post('/create', createSales.handle);

export { salesRoutes };
