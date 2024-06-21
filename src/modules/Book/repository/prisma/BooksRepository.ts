import prisma from '#/database/PrismaClient';
import { Image, Prisma } from '@prisma/client';
import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { IBooksRepository, IGetBooksFilters, IGetComicBooksFilters } from '../@types/IBooksRepository';
import { GetMarvelComicBooksDTO } from '../../dtos/GetMarvelComicBooksDTO';
import { getMarvelComicBooks } from '#/http/services/MarvelAPI/comicBooks.routes';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { UpdateBookDTO } from '../../dtos/UpdateBookDTO';
import { Book } from '../../entities/Book';

export class BooksRepository implements IBooksRepository {
  async create(data: CreateBookDTO, image: Pick<Image, 'path'>): Promise<Book> {
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
        Image: { create: { path: image.path } },
      },
      include: { Image: true },
    });

    const bookWithImageId = await prisma.book.update({
      where: { id: book.id },
      data: { imageId: book.Image?.id },
      include: { Image: true },
    });

    return bookWithImageId;
  }

  async getBooksWithFilter(filters: IGetBooksFilters): Promise<{
    total: number;
    books: Book[];
  }> {
    const { page, size, author, character, title, salespersonId, category, publishDateEnds, publishDateStarts } =
      filters;

    let where: Prisma.BookWhereInput = {};

    const pagination = {
      skip: page && size && (page <= 1 ? 0 : (page - 1) * size), //Skip the first n Books.
      take: size, //Take ±n Books from the position of the cursor.
    };

    if (category) where.category = category;

    if (salespersonId) where.salespersonId = salespersonId;

    if (publishDateEnds && !publishDateStarts) {
      where.publishDate = { lte: new Date(publishDateEnds) };
    }

    if (!publishDateEnds && publishDateStarts) {
      where.publishDate = { gte: new Date(publishDateStarts) };
    }

    if (publishDateEnds && publishDateStarts) {
      where.publishDate = {
        gte: new Date(publishDateStarts),
        lte: new Date(publishDateEnds),
      };
    }

    if (author || character || title) {
      where = {
        ...where,
        OR: [
          { title: { contains: title, mode: 'insensitive' } },
          { author: { contains: author, mode: 'insensitive' } },
          { character: { contains: character, mode: 'insensitive' } },
        ],
      };
    }

    const books = await prisma.book.findMany({ where, ...pagination, include: { Image: true } });
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
      image: book.images && book.images.length > 0 ? book.images[0].path : '',
    }));

    return { books: filteredBooks, total: total };
  }

  async findByid(id: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({ where: { id }, include: { Image: true } });

    return book;
  }

  async update(data: UpdateBookDTO): Promise<Book> {
    const { id, author, category, character, description, price, publishDate, storage, title, Image } = data;

    let prismaData: Prisma.BookUpdateInput = {};

    if (author) prismaData.author = author;

    if (category) prismaData.category = category;

    if (character) prismaData.character = character;

    if (description) prismaData.description = description;

    if (price) prismaData.price = price;

    if (publishDate) prismaData.publishDate = publishDate;

    if (storage) prismaData.storage = storage;

    if (title) prismaData.title = title;

    if (Image) prismaData.Image = { update: { where: { id: Image.id }, data: { path: Image.path } } };

    const book = await prisma.book.update({ where: { id }, data: prismaData });

    return book;
  }
}
