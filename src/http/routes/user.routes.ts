import { Router } from 'express';

import { CreateUserController } from '#modules/User/useCases/CreateUser/CreateUserController';
import { AuthUserController } from '#/modules/User/useCases/AuthUser/AuthUserController';

const CreateUser = new CreateUserController();
const AuthUser = new AuthUserController();

const userRoutes = Router();

userRoutes.post('/create', CreateUser.handle);
userRoutes.post('/login', AuthUser.handle);

export { userRoutes };
