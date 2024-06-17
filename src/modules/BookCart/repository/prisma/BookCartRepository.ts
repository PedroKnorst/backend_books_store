import prisma from '#/database/PrismaClient';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { IBooksCartRepository } from '../@types/IBooksCartRepository';

export class BookCartRepository implements IBooksCartRepository {
  async update(
    data: UpdateBookCartDTO
  ): Promise<{ id: string; bookId: string; quantity: number; totalPrice: number; cartId: string }> {
    const bookCart = await prisma.bookCart.update({
      where: { id: data.id },
      data: {
        quantity: data.quantity,
        totalPrice: data.totalPrice,
        Cart: { update: { totalPrice: data.cartTotalPrice } },
      },
    });

    return bookCart;
  }

  async findById(
    id: string
  ): Promise<{ id: string; bookId: string; quantity: number; totalPrice: number; cartId: string } | null> {
    const bookCart = await prisma.bookCart.findFirst({
      where: { id },
    });

    return bookCart;
  }

  async findByBookId(
    bookId: string
  ): Promise<{ id: string; bookId: string; quantity: number; totalPrice: number; cartId: string } | null> {
    const bookCart = await prisma.bookCart.findFirst({ where: { bookId } });

    return bookCart;
  }
}
