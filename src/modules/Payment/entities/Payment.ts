import { IClient } from '#modules/Client/entities/Client';
import { ISale } from '#modules/Sale/entities/Sale.js';
import { PaymentType } from '@prisma/client';
import { v4 } from 'uuid';

export interface IPayment {
  id: string;
  type: PaymentType;
  clientId: string | null;
  Client?: IClient | null;
  Sales?: ISale[];
}

export class Payment {
  ìd: string;
  type: PaymentType;
  clientId: string | null;
  Client?: IClient | null;
  Sales?: ISale[];

  constructor(props: IPayment) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
