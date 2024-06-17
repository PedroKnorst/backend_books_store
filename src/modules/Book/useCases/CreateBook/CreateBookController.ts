import { Request, Response } from 'express';
import { makeCreateBookUseCase } from '.';

export class CreateBookController {
  async handle(req: Request, res: Response) {
    const { title, author, character, description, price, storage, publishDate, category } = JSON.parse(req.body.book);

    const salespersonId = req.user.salespersonId;

    const requestImage = req.file as Express.Multer.File;

    const Image = {
      path: requestImage.filename,
    };

    const book = await makeCreateBookUseCase().execute({
      title,
      author,
      character,
      description,
      price: Number(price),
      storage: Number(storage),
      publishDate: publishDate !== '' ? new Date(publishDate) : undefined,
      salespersonId,
      category,
      Image,
    });

    return res.json(book);
  }
}
