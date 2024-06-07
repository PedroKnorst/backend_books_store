import { IBook } from '#/modules/Book/entities/Book';
import { ISale } from '#/modules/Sale/entities/Sale';
import { IUser } from '#/modules/User/entities/User';
import { v4 } from 'uuid';

export interface ISalesperson {
  id: string;
  User: IUser;
  userId: string;
  balance: number;
  Sales: ISale[];
  Books: IBook[];
}

export class Salesperson {
  id: string;
  userId: string;
  balance: number;

  constructor(props: ISalesperson) {
    if (!props.id) {
      props.id = v4();
    }

    Object.assign(this, props);
  }
}
