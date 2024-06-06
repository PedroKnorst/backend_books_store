import prisma from '#/database/PrismaClient';
import { AppError } from '#/http/middlewares/ErrorHandler';
import { config } from 'dotenv-safe';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

config();

const SECRET = process.env.SECRET || '12345';

interface IPayload {
  id: string;
}

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return next(new AppError('Token não reconhecido! Usuário invalido!', 401));
  }

  try {
    const { id } = jwt.verify(token, SECRET) as IPayload;

    const userExists = await prisma.user.findFirst({ where: { id } });

    if (!userExists) throw new AppError('Usuário não existe!', 401);

    req.user = { id };

    next();
  } catch (error) {
    console.log(error);
    return next(new AppError('Token não reconhecido! Usuário invalido!', 401));
  }
}
