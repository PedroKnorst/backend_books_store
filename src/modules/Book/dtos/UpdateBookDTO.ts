import { BookCategory } from '@prisma/client';

export interface UpdateBookDTO {
  id: string;
  title?: string;
  author?: string;
  character?: string;
  publishDate?: Date;
  category?: BookCategory;
  description?: string;
  price?: number;
  storage?: number;
}
