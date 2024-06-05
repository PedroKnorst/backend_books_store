import { Router } from 'express';
import { userRoutes } from './user.routes';
import { verifyJWT } from '#/utils/verifyJWT';

const router = Router();

router.use('/user', userRoutes);

router.use(verifyJWT);

export { router };
