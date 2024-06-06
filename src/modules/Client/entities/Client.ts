import { IPayment } from '#modules/Payment/entities/Payment';
import { IUser } from '#modules/User/entities/User.js';
import { v4 } from 'uuid';

export interface IClient {
  id: string;
  Users: IUser[];
  Payment: IPayment;
  paymentId: string;
}

export class Client {
  id: string;
  paymentId: string;

  constructor(props: IClient) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
