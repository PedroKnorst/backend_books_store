import prisma from '#/database/PrismaClient';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { ICartRepository } from '../@types/ICartRepository';
import { ICart } from '../../entities/Cart';

export class CartRepository implements ICartRepository {
  async addBookToCart(data: AddBookToCartDTO): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    const cart = await prisma.cart.update({
      where: { id: data.id },
      data: { BooksCart: { create: { quantity: data.quantity, totalPrice: data.totalPrice, bookId: data.bookId } } },
      include: { BooksCart: true },
    });

    return cart;
  }

  async removeBookOfCart(data: RemoveBookOfCartDTO): Promise<void> {
    await prisma.cart.update({
      where: { id: data.id },
      data: { BooksCart: { delete: { id: data.id } } },
      include: { BooksCart: true },
    });
  }

  async findCartByClient(clientId: string): Promise<ICart | null> {
    const cart = await prisma.cart.findFirst({
      where: { clientId },
      include: { BooksCart: { include: { Book: true } } },
    });

    return cart;
  }

  async create(): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    const cart = await prisma.cart.create({ data: {} });

    return cart;
  }

  async update({
    clientId,
    id,
  }: {
    clientId: string;
    id: string;
  }): Promise<{ id: string; totalPrice: number; clientId: string | null }> {
    const cart = await prisma.cart.update({ data: { clientId }, where: { id } });

    return cart;
  }
}
