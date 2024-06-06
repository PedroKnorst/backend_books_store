import { PaymentsRepository } from '../../repository/prisma/PaymentsRepository';
import { CreatePaymentUseCase } from './CreatePaymentUseCase';

export const makeCreatePaymentUseCase = () => {
  const paymentsRepository = new PaymentsRepository();

  const useCase = new CreatePaymentUseCase(paymentsRepository);

  return useCase;
};
