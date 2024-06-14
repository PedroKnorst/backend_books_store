import { Request, Response } from 'express';
import { makeFindByIdUseCase } from '.';

export class FindByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const book = await makeFindByIdUseCase().execute(id);

    return res.json(book);
  }
}
