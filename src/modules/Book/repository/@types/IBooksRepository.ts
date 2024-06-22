import { BookCategory, Image } from '@prisma/client';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { GetMarvelComicBooksDTO } from '../../dtos/GetMarvelComicBooksDTO';
import { UpdateBookDTO } from '../../dtos/UpdateBookDTO';
import { Book } from '../../entities/Book';

export interface IGetBooksFilters {
  page?: number;
  size?: number;
  salespersonId?: string;
  title?: string;
  author?: string;
  character?: string;
  category?: BookCategory;
  publishDateStarts?: string;
  publishDateEnds?: string;
}

export interface IGetComicBooksFilters {
  digitalId?: string;
  page?: number;
  size?: number;
  title?: string;
  startYear?: string;
  characters?: string;
  creators?: string;
}

export interface IBooksRepository {
  create(data: CreateBookDTO, image: Pick<Image, 'path'>): Promise<Book>;
  getBooksWithFilter(filters: IGetBooksFilters): Promise<{ total: number; books: Book[] }>;
  getComicBooksFromAPI?(filters: IGetComicBooksFilters): Promise<{ total: number; books: GetMarvelComicBooksDTO[] }>;
  findByid(id: string): Promise<Book | null>;
  update(data: UpdateBookDTO): Promise<Book>;
  findComicBookById?(digitalId: string): Promise<GetMarvelComicBooksDTO | null>;
}
