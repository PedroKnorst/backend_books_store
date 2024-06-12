import { IBookCart } from '#/modules/BookCart/entities/BookCart';
import { ISalesperson } from '#/modules/Salesperson/entities/Salesperson';

export interface IBook {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  BookCarts: IBookCart[];
  salespersonId: string;
  Salesperson: ISalesperson;
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
}
