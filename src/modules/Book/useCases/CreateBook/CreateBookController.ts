import { Request, Response } from 'express';
import { makeCreateBookUseCase } from '.';

export class CreateBookController {
  async handle(req: Request, res: Response) {
    const { title, authors, characters, description, price, storage, publishDate, salespersonId, category } = req.body;

    const book = await makeCreateBookUseCase().execute({
      title,
      authors,
      characters,
      description,
      price,
      storage,
      publishDate,
      salespersonId,
      category,
    });

    return res.json(book);
  }
}
