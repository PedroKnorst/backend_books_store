import { CartRepository } from '#/modules/Cart/repository/prisma/CartRepository';
import { SalesRepository } from '../../repository/prisma/SalesRepository';
import { CreateSalesUseCase } from './CreateSalesUseCase';

export const makeCreateSaleUseCase = () => {
  const salesRepository = new SalesRepository();
  const cartsRepository = new CartRepository();

  const useCase = new CreateSalesUseCase(salesRepository, cartsRepository);

  return useCase;
};
