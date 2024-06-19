import { ICart } from '#/modules/Cart/entities/Cart';
import { IPayment } from '#modules/Payment/entities/Payment';
import { IUser } from '#modules/User/entities/User.js';
import { v4 } from 'uuid';

export interface IClient {
  id: string;
  User?: IUser;
  userId: string;
  Payment?: IPayment;
  paymentId: string;
  Cart?: ICart;
  cartId: string;
}

export class Client {
  id: string;
  paymentId: string | null;
  User?: IUser | null;
  Payment?: IPayment | null;
  Cart?: ICart | null;
  userId: string;
  cartId: string;

  constructor(props: Omit<IClient, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }

    Object.assign(this, props);
  }
}
