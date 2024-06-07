import { ICart } from '#/modules/Cart/entities/Cart';
import { IPayment } from '#modules/Payment/entities/Payment';
import { IUser } from '#modules/User/entities/User.js';
import { v4 } from 'uuid';

export interface IClient {
  id: string;
  User: IUser;
  userId: string;
  Payment: IPayment;
  paymentId: string;
  Cart: ICart;
  cartId: string;
}

export class Client {
  id: string;
  paymentId: string;
  userId: string;
  cartId: string;

  constructor(props: IClient) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
