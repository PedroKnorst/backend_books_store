import { Router } from 'express';
import { userRoutes } from './user.routes';
import { booksRouter } from './book.routes';
import { cartRoutes } from './cart.routes';
import { bookCartRoutes } from './bookCart.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/book', booksRouter);
router.use('/cart', cartRoutes);
router.use('/bookCart', bookCartRoutes);

export { router };
