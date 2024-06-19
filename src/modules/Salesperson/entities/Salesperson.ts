import { IBook } from '#/modules/Book/entities/Book';
import { ISale } from '#/modules/Sale/entities/Sale';
import { IUser } from '#/modules/User/entities/User';
import { v4 } from 'uuid';

export interface ISalesperson {
  id: string;
  User?: IUser;
  userId: string;
  balance: number | null;
  Sales?: ISale[];
  Books?: IBook[];
}

export class Salesperson {
  id: string;
  userId: string;
  balance: number | null;
  Sales?: ISale[];
  Books?: IBook[];
  User?: IUser;

  constructor(props: Omit<ISalesperson, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }

    Object.assign(this, props);
  }
}
