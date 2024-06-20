import { CreateBookDTO } from '../../dtos/CreateBookDTO';
import { UpdateBookDTO } from '../../dtos/UpdateBookDTO';
import { Book } from '../../entities/Book';
import { IBooksRepository, IGetBooksFilters } from '../@types/IBooksRepository';

export class BooksRepositoryInMemory implements IBooksRepository {
  books: Book[] = [];

  constructor(seeds?: boolean) {
    if (seeds) {
      this.books.push({
        id: 'bookId1',
        author: 'Stan Lee',
        category: 'ACTION',
        character: 'Homem de Ferro',
        description: 'Homem de Ferro descrição',
        price: 20,
        salespersonId: 'salespersonId1',
        storage: 5,
        title: 'Homem de Ferro 1',
      });
      this.books.push({
        id: 'bookId3',
        author: 'Stan Lee',
        category: 'ACTION',
        character: 'Homem de Ferro',
        description: 'Homem de Ferro descrição',
        price: 20,
        salespersonId: 'salespersonId1',
        storage: 5,
        title: 'Homem de Ferro 3',
      });
      this.books.push({
        id: 'bookId5',
        author: 'Stan Lee',
        category: 'ACTION',
        character: 'Homem de Ferro',
        description: 'Vingadores Guerra Infinita descrição',
        price: 20,
        salespersonId: 'salespersonId1',
        storage: 5,
        title: 'Vingadores Guerra Infinita',
      });
    }
  }

  async create(data: CreateBookDTO): Promise<Book> {
    const book = new Book(data);

    this.books.push(book);

    return book;
  }

  async findByid(id: string): Promise<Book | null> {
    const book = this.books.find(currentBook => currentBook.id === id);

    return book || null;
  }

  async getBooksWithFilter(filters: IGetBooksFilters): Promise<{ total: number; books: Book[] }> {
    const { author, character, salespersonId, title } = filters;

    let filteredBooks = this.books.filter(
      book =>
        book.author === author ||
        book.character === character ||
        book.title === title ||
        book.salespersonId === salespersonId
    );

    return {
      books: filteredBooks,
      total: filteredBooks.length,
    };
  }
  async update(data: UpdateBookDTO): Promise<Book> {
    const { author, category, character, description, price, publishDate, storage, title } = data;

    const bookIndex = this.books.findIndex(currentBook => currentBook.id === data.id);

    let book = this.books[bookIndex];

    if (author) book.author = author;
    if (category) book.category = category;
    if (character) book.character = character;
    if (description) book.description = description;
    if (price) book.price = price;
    if (publishDate) book.publishDate = publishDate;
    if (storage) book.storage = storage;
    if (title) book.title = title;

    return book;
  }
}
