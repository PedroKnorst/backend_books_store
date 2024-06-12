import { GetComicBooksMarvelAPIController } from '#/modules/Book/useCases/GetComicBooksMarvelAPI/GetComicBooksMarvelAPIController';
import { verifyJWT } from '#/utils/verifyJWT';
import { Router } from 'express';

const booksRouter = Router();

const getMarvelComicBooks = new GetComicBooksMarvelAPIController();

booksRouter.use(verifyJWT);

booksRouter.get('/marvelBooks', getMarvelComicBooks.handle);

export { booksRouter };
