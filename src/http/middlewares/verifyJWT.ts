import { config } from 'dotenv-safe';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './ErrorHandler';
import prisma from '#/database/PrismaClient';

config();

const SECRET = process.env.SECRET || '12345';

interface IPayload {
  id: string;
}

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) {
    const error = new AppError('Token não reconhecido! Usuário invalido!', 401);

    return next(error);
  }

  const [, token] = auth.split(' ');

  try {
    const { id } = jwt.verify(token, SECRET) as IPayload;

    const userExists = await prisma.user.findFirst({ where: { id } });

    if (!userExists) throw new AppError('Usuário não existe!', 401);

    req.user = { id };

    next();
  } catch (error) {
    console.log(error);
    throw new AppError('Token não reconhecido! Usuário invalido!', 401);
  }
}
