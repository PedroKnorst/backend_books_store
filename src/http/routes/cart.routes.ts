import { AddOrDeleteBookOfCartController } from '#/modules/Cart/useCases/AddOrDeleteBookOfCartUseCase/AddOrDeleteBookOfCartController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';

const cartRoutes = Router();

const addOrDelete = new AddOrDeleteBookOfCartController();

cartRoutes.use(verifyJWT);

cartRoutes.put('/book/:bookId', addOrDelete.handle);

export { cartRoutes };
