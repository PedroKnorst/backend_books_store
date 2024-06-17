import { Request, Response } from 'express';
import { makeUpdateBookUseCase } from '.';

export class UpdateBookController {
  async handle(res: Response, req: Request) {
    const { author, category, character, description, price, publishDate, storage, title, fileId } = req.body.book;

    const file = req.file as Express.Multer.File;

    const Image = {
      path: file.filename,
      id: fileId,
    };

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
      Image,
    });

    return res.json(book);
  }
}
