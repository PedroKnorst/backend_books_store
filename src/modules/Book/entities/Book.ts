import { IBookCart } from '#/modules/BookCart/entities/BookCart';
import { ISalesperson } from '#/modules/Salesperson/entities/Salesperson';
import { BookCategory, Image } from '@prisma/client';
import { v4 } from 'uuid';

export interface IBook {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  category: BookCategory;
  publishDate?: Date;
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
  category: BookCategory;
  publishDate?: Date | null;
  imageId?: string | null;
  Image?: Image | null;

  constructor(props: Omit<IBook, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }

    Object.assign(this, props);
  }
}
