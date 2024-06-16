import { AddOrDeleteBookOfCartController } from '#/modules/Cart/useCases/AddOrDeleteBookOfCartUseCase/AddOrDeleteBookOfCartController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import { GetCartController } from '#/modules/Cart/useCases/GetCart/GetCartController';

const cartRoutes = Router();

const addOrDelete = new AddOrDeleteBookOfCartController();
const getCart = new GetCartController();

cartRoutes.use(verifyJWT);

cartRoutes.put('/book/:bookId', addOrDelete.handle);
cartRoutes.get('/client/:clientId', getCart.handle);

export { cartRoutes };
