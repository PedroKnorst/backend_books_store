import { Request, Response } from 'express';
import { makeUpdateBookUseCase } from '.';

export class UpdateBookController {
  async handle(req: Request, res: Response) {
    const { author, category, character, description, price, publishDate, storage, title } = req.body;

    const { bookId } = req.params;

    const book = await makeUpdateBookUseCase().execute({
      id: bookId,
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
