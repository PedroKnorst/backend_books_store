import { IClient } from '#/modules/Client/entities/Client';
import { ISale } from '#/modules/Sale/entities/Sale';

export interface ICart {
  id: string;
  //   BooksCart:
  totalPrice: number;
  Sales: ISale[];
  Client: IClient;
  clientId: string;
}
