import { Request, Response } from 'express';
import { makeAddOrDeleteBookOfCartUseCase } from '.';
import { AppError } from '#/http/middlewares/ErrorHandler';

export class AddOrDeleteBookOfCartController {
  async handle(req: Request, res: Response) {
    const { bookId } = req.params;

    const { deleteBook } = req.body;

    const { cartId } = req.user.Client;

    if (!cartId) throw new AppError('Permissão necessária!');

    const cart = await makeAddOrDeleteBookOfCartUseCase().execute({ bookId, id: cartId }, deleteBook);

    return res.json(cart);
  }
}
