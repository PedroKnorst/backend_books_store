import { BookCategory } from '@prisma/client';

export interface CreateBookDTO {
  title: string;
  authors: string[];
  characters: string[];
  description: string;
  price: number;
  storage: number;
  publishDate?: Date;
  salespersonId: string;
  category: BookCategory;
}
