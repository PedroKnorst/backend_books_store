import { Book } from '@prisma/client';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { GetMarvelComicBooksDTO } from '../../dtos/GetMarvelComicBooksDTO';

export interface IGetBooksFilters {
  page: number;
  size: number;
  salespersonId?: string;
  title?: string;
  author?: string;
  character?: string;
}

export interface IGetComicBooksFilters {
  page: number;
  size: number;
}

export interface IBooksRepository {
  create(data: CreateBookDTO): Promise<Book>;
  getBooksWithFilter(filters: IGetBooksFilters): Promise<{ total: number; books: Book[] }>;
  getComicBooksFromAPI(filters: IGetComicBooksFilters): Promise<{ total: number; books: GetMarvelComicBooksDTO[] }>;
  findByid(id: string): Promise<Book | null>;
}
