import { Request, Response } from 'express';
import { makeGetBooksWithFilterUseCase } from '.';

export class GetBooksWithFilterController {
  async handle(req: Request, res: Response) {
    const { page, size } = req.query;

    const { books, total } = await makeGetBooksWithFilterUseCase().execute({ page: Number(page), size: Number(size) });

    return res.json({ books, total });
  }
}
