import { Request, Response } from 'express';
import { makeCreateSaleUseCase } from '.';

export class CreateSalesController {
  async handle(req: Request, res: Response) {
    const { paymentId } = req.body;

    const { clientId } = req.user;

    const sales = await makeCreateSaleUseCase().execute({ clientId, paymentId });

    return res.json(sales);
  }
}
