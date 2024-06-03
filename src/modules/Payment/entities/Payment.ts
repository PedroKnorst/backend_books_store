import { IClient } from '#modules/Client/entities/Client';
import { ISales } from '#modules/Sale/entities/Sale.js';
import { PaymentType } from '@prisma/client';

export interface IPayment {
  ìd: string;
  type: PaymentType;
  Clients: IClient[];
  Sales: ISales[];
}
