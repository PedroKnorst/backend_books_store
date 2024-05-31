import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/', () => {
  console.log('success');
});

export { userRoutes };
