import { Router } from 'express';
import { userRoutes } from './user';

const router = Router();

console.log('teste');

router.use('/user', userRoutes);

export { router };
