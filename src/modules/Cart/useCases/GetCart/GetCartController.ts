import { Request, Response } from 'express';
import { makeGetCartUseCase } from '.';

export class GetCartController {
  async handle(req: Request, res: Response) {
    const { clientId } = req.params;

    const cart = await makeGetCartUseCase().execute(clientId);

    return res.json(cart);
  }
}
