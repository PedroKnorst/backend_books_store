import { Request, Response } from 'express';
import { makeUpdateBookUseCase } from '.';

export class UpdateBookController {
  async handle(res: Response, req: Request) {
    const { author, category, character, description, price, publishDate, storage, title } = req.body;
    const { id } = req.params;

    const book = await makeUpdateBookUseCase().execute({
      id,
      author,
      category,
      character,
      description,
      price,
      publishDate,
      storage,
      title,
    });

    return res.json(book);
  }
}
