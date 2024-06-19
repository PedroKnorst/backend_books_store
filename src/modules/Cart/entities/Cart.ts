import { IBookCart } from '#/modules/BookCart/entities/BookCart';
import { IClient } from '#/modules/Client/entities/Client';
import { ISale } from '#/modules/Sale/entities/Sale';
import { v4 } from 'uuid';

export interface ICart {
  id: string;
  BooksCart: IBookCart[];
  totalPrice: number;
  Sales?: ISale[];
  Client?: IClient;
  clientId?: string | null;
}

export class Cart {
  id: string;
  clientId?: string | null;
  Sales?: ISale[];
  Client?: IClient;
  totalPrice: number;
  BooksCart?: IBookCart[];

  constructor(props: ICart) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
