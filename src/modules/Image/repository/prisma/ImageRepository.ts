import prisma from '#/database/PrismaClient';
import { IImageRepository } from '../@types/IImageRepository';

export class ImageRepository implements IImageRepository {
  async create(data: { bookId: string; path: string }): Promise<{ id: string; path: string; bookId: string }> {
    const image = await prisma.image.create({
      data: {
        path: data.path,
        bookId: data.bookId,
      },
    });

    return image;
  }
}
