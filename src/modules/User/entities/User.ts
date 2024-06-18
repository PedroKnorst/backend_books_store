import { Client, IClient } from '#modules/Client/entities/Client.js';
import { ISalesperson, Salesperson } from '#modules/Salesperson/entities/Salesperson.js';
import { v4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  salespersonId?: string | null;
  Salesperson?: ISalesperson | null;
  clientId?: string | null;
  Client?: IClient | null;
}

export class User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  salespersonId?: string | null;
  Salesperson?: Salesperson | null;
  clientId?: string | null;
  Client?: Client | null;

  constructor(props: Omit<IUser, 'id'>, id?: string) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }
    Object.assign(this, props);
  }
}
