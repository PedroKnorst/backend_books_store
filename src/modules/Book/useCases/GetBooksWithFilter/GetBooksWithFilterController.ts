import { Request, Response } from 'express';
import { makeGetBooksWithFilterUseCase } from '.';
import { IGetBooksFilters } from '../../repository/@types/IBooksRepository';

export class GetBooksWithFilterController {
  async handle(req: Request, res: Response) {
    const { page, size, author, character, title, category, publishDateStarts, publishDateEnds } = req.query as IGetBooksFilters;

    const { salespersonId } = req.user;

    const { books, total } = await makeGetBooksWithFilterUseCase().execute({
      page: Number(page),
      size: Number(size),
      salespersonId,
      author,
      category,
      character,
      publishDateEnds,
      publishDateStarts,
      title,
    });

    return res.json({ books, total });
  }
}
