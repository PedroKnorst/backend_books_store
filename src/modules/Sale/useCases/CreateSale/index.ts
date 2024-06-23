import { BooksRepository } from '#/modules/Book/repository/prisma/BooksRepository';
import { CartRepository } from '#/modules/Cart/repository/prisma/CartRepository';
import { SalespersonRepository } from '#/modules/Salesperson/repository/prisma/SalespersonRepository';
import { SalesRepository } from '../../repository/prisma/SalesRepository';
import { CreateSalesUseCase } from './CreateSalesUseCase';

export const makeCreateSaleUseCase = () => {
  const salesRepository = new SalesRepository();
  const cartsRepository = new CartRepository();
  const salespersonRepository = new SalespersonRepository();
  const booksRepository = new BooksRepository();

  const useCase = new CreateSalesUseCase(salesRepository, cartsRepository, salespersonRepository, booksRepository);

  return useCase;
};
