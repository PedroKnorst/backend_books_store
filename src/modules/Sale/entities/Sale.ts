import { ICart } from '#/modules/Cart/entities/Cart';
import { IPayment } from '#/modules/Payment/entities/Payment';
import { ISalesperson } from '#/modules/Salesperson/entities/Salesperson';
import { v4 } from 'uuid';

export interface ISale {
  id: string;
  Cart: ICart;
  cartId: string;
  Payment: IPayment;
  paymentId: string;
  Salesperson: ISalesperson;
  salespersonId: string;
}

export class Sale {
  id: string;
  Cart?: ICart;
  cartId: string;
  Payment?: IPayment;
  paymentId: string;
  Salesperson?: ISalesperson;
  salespersonId: string;

  constructor(props: Omit<ISale, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }

    Object.assign(this, props);
  }
}
