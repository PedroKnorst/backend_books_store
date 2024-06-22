import { Request, Response } from 'express';
import { makeGetComicBooksMarvelAPIUseCase } from '.';
import { IGetComicBooksFilters } from '../../repository/@types/IBooksRepository';

export class GetComicBooksMarvelAPIController {
  async handle(req: Request, res: Response) {
    const { page, size, title, startYear, characters, creators, digitalId } = req.query as IGetComicBooksFilters;

    const { books, total } = await makeGetComicBooksMarvelAPIUseCase().execute({
      page: page && Number(page),
      size: size && Number(size),
      characters,
      creators,
      startYear,
      title,
      digitalId,
    });

    return res.json({ books, total });
  }
}
