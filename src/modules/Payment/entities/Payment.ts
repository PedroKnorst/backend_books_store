import { IClient } from '#modules/Client/entities/Client';
import { ISale } from '#modules/Sale/entities/Sale.js';
import { PaymentType } from '@prisma/client';
import { v4 } from 'uuid';

export interface IPayment {
  id: string;
  type: PaymentType;
  Clients: IClient[];
  Sales: ISale[];
}

export class Payment {
  ìd: string;
  type: PaymentType;

  constructor(props: IPayment) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
