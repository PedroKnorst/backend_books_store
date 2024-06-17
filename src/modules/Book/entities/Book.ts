import { IBookCart } from '#/modules/BookCart/entities/BookCart';
import { ISalesperson } from '#/modules/Salesperson/entities/Salesperson';
import { Image } from '@prisma/client';

export interface IBook {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  BookCarts?: IBookCart[];
  salespersonId: string | null;
  Salesperson?: ISalesperson;
  Image?: Image;
  imageId?: string;
}

export class Book {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  salespersonId: string;
  imageId?: string;
}
