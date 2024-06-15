import { UpdateBookCartController } from '#/modules/BookCart/useCases/UpdateBookCart/UpdateBookCartController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';

const bookCartRoutes = Router();

const updateBookCart = new UpdateBookCartController();

bookCartRoutes.use(verifyJWT);

bookCartRoutes.put('/:id', updateBookCart.handle);

export { bookCartRoutes };
