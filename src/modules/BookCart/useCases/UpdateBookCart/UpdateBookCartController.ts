import { Request, Response } from 'express';
import { makeUpdateBookCartUseCase } from '.';

export class UpdateBookCartController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { quantity } = req.body;

    const { clientId } = req.user;

    const bookCart = await makeUpdateBookCartUseCase().execute({ id, quantity, clientId });

    return res.json(bookCart);
  }
}
