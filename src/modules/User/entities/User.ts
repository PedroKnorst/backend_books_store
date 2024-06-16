import { IClient } from '#modules/Client/entities/Client.js';
import { ISalesperson } from '#modules/Salesperson/entities/Salesperson.js';
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
  phone?: string;
  password: string;
  salespersonId?: string;
  clientId?: string;

  constructor(props: IUser) {
    if (!props.id) {
      props.id = v4();
    }
    Object.assign(this, props);
  }
}
