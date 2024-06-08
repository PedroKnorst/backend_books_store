import { IClient } from '#/modules/Client/entities/Client';
import { ISale } from '#/modules/Sale/entities/Sale';
import { v4 } from 'uuid';

export interface ICart {
  id: string;
  //   BooksCart:
  totalPrice: number;
  Sales: ISale[];
  Client: IClient;
  clientId: string;
}

export class Cart {
  id: string;
  clientId: string;
  totalPrice: number;

  constructor(props: ICart) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
