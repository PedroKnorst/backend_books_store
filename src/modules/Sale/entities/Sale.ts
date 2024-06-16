import { ICart } from '#/modules/Cart/entities/Cart';
import { IPayment } from '#/modules/Payment/entities/Payment';
import { ISalesperson } from '#/modules/Salesperson/entities/Salesperson';

export interface ISale {
  id: string;
  Cart: ICart;
  cartId: string;
  Payment: IPayment;
  paymentId: string;
  Salesperson: ISalesperson;
  salespersonId: string;
}
