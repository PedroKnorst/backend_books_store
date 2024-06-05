import { Request, Response } from 'express';
import { makeCreateUserUseCase } from '.';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const createUser = makeCreateUserUseCase();

    const user = await createUser.execute({ name, email, password, phone });

    return res.status(201).json(user);
  }
}
