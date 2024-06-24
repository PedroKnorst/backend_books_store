import { CreateBookController } from '#/modules/Book/useCases/CreateBook/CreateBookController';
import { GetComicBooksMarvelAPIController } from '#/modules/Book/useCases/GetComicBooksMarvelAPI/GetComicBooksMarvelAPIController';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import { GetBooksWithFilterController } from '#/modules/Book/useCases/GetBooksWithFilter/GetBooksWithFilterController';
import { FindByIdController } from '#/modules/Book/useCases/FindById/FindByIdController';
import { UpdateBookController } from '#/modules/Book/useCases/UpdateBook/UpdateBookController';
import { uploadFile } from '#/config/multer';

const booksRouter = Router();

const getMarvelComicBooks = new GetComicBooksMarvelAPIController();
const createBook = new CreateBookController();
const getBooks = new GetBooksWithFilterController();
const findBookById = new FindByIdController();
const updateBook = new UpdateBookController();

booksRouter.use(verifyJWT);

booksRouter.get('/marvelBooks', getMarvelComicBooks.handle);
booksRouter.get('/', getBooks.handle);
booksRouter.get('/:id', findBookById.handle);
booksRouter.post('/create', uploadFile, createBook.handle);
booksRouter.put('/:bookId', updateBook.handle);

export { booksRouter };
