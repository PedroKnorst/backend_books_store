import { Router } from 'express';
import { userRoutes } from './user.routes';
import { booksRouter } from './book.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/book', booksRouter);

export { router };
