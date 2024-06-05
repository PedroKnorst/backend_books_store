import { Request, Response } from 'express';
import { makeAuthUserUseCase } from '.';

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUser = makeAuthUserUseCase();

    const token = await authUser.execute({ email, password });

    return res.status(200).json(token);
  }
}
