import prisma from '#/database/PrismaClient';
import { Book, Prisma } from '@prisma/client';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { IBooksRepository, IGetBooksFilters, IGetComicBooksFilters } from '../@types/IBooksRepository';
import { GetMarvelComicBooksDTO } from '../../dtos/GetMarvelComicBooksDTO';
import { getMarvelComicBooks } from '#/http/services/MarvelAPI/comicBooks.routes';
import { AppError } from '#/http/middlewares/ErrorHandler';

export class BooksRepository implements IBooksRepository {
  async create(data: CreateBookDTO): Promise<Book> {
    const book = await prisma.book.create({
      data: {
        author: data.author,
        character: data.character,
        description: data.description,
        price: data.price,
        publishDate: data.publishDate,
        storage: data.storage,
        title: data.title,
        category: data.category,
        Salesperson: { connect: { id: data.salespersonId } },
      },
    });

    return book;
  }

  async getBooksWithFilter(filters: IGetBooksFilters): Promise<{
    total: number;
    books: Book[];
  }> {
    const { page, size, author, character, title } = filters;

    const where: Prisma.BookWhereInput = {};

    const pagination = {
      skip: page <= 1 ? 0 : (page - 1) * size, //Skip the first n Books.
      take: size, //Take ±n Books from the position of the cursor.
    };

    if (author) where.author = author;

    if (character) where.character = character;

    if (title) where.title = title;

    const books = await prisma.book.findMany({ where, ...pagination });
    const total = await prisma.book.count({ where });

    return { books, total };
  }

  async getComicBooksFromAPI(
    filters: IGetComicBooksFilters
  ): Promise<{ total: number; books: GetMarvelComicBooksDTO[] }> {
    const { books, total } = await getMarvelComicBooks(filters).catch(error => {
      throw new AppError(error.message);
    });

    const filteredBooks: GetMarvelComicBooksDTO[] = books.map((book: any) => ({
      title: book.title,
      description: book.description,
      pageCount: book.pageCount,
      prices: book.prices.map((typePrice: { price: number }) => typePrice.price),
      authors: book.creators.items.map((author: { name: string }) => author.name),
      characters: book.characters.items.map((character: { name: string }) => character.name),
      publishDate: new Date(
        book.dates.find((publishDate: { type: string; date: string }) => publishDate.type === 'onsaleDate').date
      ),
    }));

    return { books: filteredBooks, total: total };
  }
}
