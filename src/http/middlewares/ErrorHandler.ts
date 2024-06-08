import { NextFunction, Request, Response } from 'express';

export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  return res.status(500).json({ error: 'Erro interno no servidor!' });
};
