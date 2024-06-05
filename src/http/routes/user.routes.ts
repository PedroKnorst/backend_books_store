import { Router } from 'express';

import { CreateUserController } from '#modules/User/useCases/CreateUser/CreateUserController';

const CreateUser = new CreateUserController();

const userRoutes = Router();

userRoutes.post('/create', CreateUser.handle);
userRoutes.post('/login');

export { userRoutes };
