import prisma from '#/database/PrismaClient';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { ICartRepository } from '../@types/ICartRepository';
import { ICart } from '../../entities/Cart';
import { Prisma } from '@prisma/client';

export class CartRepository implements ICartRepository {
  async addBookToCart(data: AddBookToCartDTO): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    const cart = await prisma.cart.update({
      where: { id: data.id },
      data: {
        BooksCart: { create: { quantity: data.quantity, totalPrice: data.totalPrice, bookId: data.bookId } },
        totalPrice: data.cartTotalPrice,
      },
      include: { BooksCart: true },
    });

    return cart;
  }

  async removeBookOfCart(data: RemoveBookOfCartDTO): Promise<void> {
    await prisma.cart.update({
      where: { id: data.id },
      data: { BooksCart: { delete: { id: data.id } }, totalPrice: data.cartTotalPrice },
      include: { BooksCart: true },
    });
  }

  async findCartByClient(clientId: string): Promise<ICart | null> {
    const cart = await prisma.cart.findFirst({
      where: { clientId },
      include: { BooksCart: { include: { Book: { include: { Salesperson: true } } } } },
    });

    return cart;
  }

  async create(): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    const cart = await prisma.cart.create({ data: {} });

    return cart;
  }

  async update(data: {
    clientId?: string;
    id: string;
    bookCartId?: string;
  }): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    let dataPrisma: Prisma.CartUpdateInput = {};

    if (data.clientId) {
      dataPrisma.clientId = data.clientId;
    }

    if (data.bookCartId) {
      dataPrisma.BooksCart = { disconnect: { id: data.bookCartId } };
    }

    const cart = await prisma.cart.update({
      data: dataPrisma,
      where: { id: data.id },
    });

    return cart;
  }
}
