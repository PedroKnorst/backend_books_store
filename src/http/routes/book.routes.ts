import { CreateBookController } from '#/modules/Book/useCases/CreateBook/CreateBookController';
import { GetComicBooksMarvelAPIController } from '#/modules/Book/useCases/GetComicBooksMarvelAPI/GetComicBooksMarvelAPIController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import { GetBooksWithFilterController } from '#/modules/Book/useCases/GetBooksWithFilter/GetBooksWithFilterController';

const booksRouter = Router();

const getMarvelComicBooks = new GetComicBooksMarvelAPIController();
const createBook = new CreateBookController();
const getBooks = new GetBooksWithFilterController();

booksRouter.use(verifyJWT);

booksRouter.get('/marvelBooks', getMarvelComicBooks.handle);
booksRouter.get('/', getBooks.handle);
booksRouter.post('/create', createBook.handle);

export { booksRouter };
