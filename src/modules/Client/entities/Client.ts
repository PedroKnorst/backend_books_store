import { IPayment } from '#modules/Payment/entities/Payment';
import { IUser } from '#modules/User/entities/User.js';

export interface IClient {
  id: string;
  Users: IUser[];
  Payment: IPayment;
}
