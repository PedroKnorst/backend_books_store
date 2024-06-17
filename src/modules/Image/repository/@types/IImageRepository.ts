import { Image } from '@prisma/client';

export interface IImageRepository {
  create(data: { bookId: string; path: string }): Promise<Image>;
}
