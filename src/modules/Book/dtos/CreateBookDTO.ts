import { BookCategory, Image } from '@prisma/client';

export interface CreateBookDTO {
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  publishDate?: Date;
  salespersonId: string;
  category: BookCategory;
  Image?: Pick<Image, 'path'>;
}
