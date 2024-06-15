declare namespace Express {
  export interface Request {
    user: {
      id: string;
      clientId: string;
      salespersonId: string;
      Client: { id: string; userId: string; cartId: string | null };
      Salesperson: { id: string; balance: number | null; userId: string };
    };
  }
}
