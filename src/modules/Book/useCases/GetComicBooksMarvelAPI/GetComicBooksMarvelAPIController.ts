import { Request, Response } from 'express';
import { makeGetComicBooksMarvelAPIUseCase } from '.';

export class GetComicBooksMarvelAPIController {
  async handle(req: Request, res: Response) {
    const { page, size } = req.query;

    const { books, total } = await makeGetComicBooksMarvelAPIUseCase().execute({
      page: Number(page),
      size: Number(size),
    });

    return res.json({ books, total });
  }
}
