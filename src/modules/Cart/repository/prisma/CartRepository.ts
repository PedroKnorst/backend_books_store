import prisma from '#/database/PrismaClient';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { ICartRepository } from '../@types/ICartRepository';

export class CartRepository implements ICartRepository {
  async addBookToCart(data: AddBookToCartDTO): Promise<{ id: string; totalPrice: number; clientId: string }> {
    const cart = await prisma.cart.update({
      where: { id: data.id },
      data: { BooksCart: { create: { quantity: data.quantity, totalPrice: data.totalPrice, bookId: data.bookId } } },
    });

    return cart;
  }

  async removeBookOfCart(data: RemoveBookOfCartDTO): Promise<void> {
    await prisma.cart.update({ where: { id: data.id }, data: { BooksCart: { delete: { id: data.id } } } });
  }
}
