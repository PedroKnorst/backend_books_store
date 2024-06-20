import prisma from '#/database/PrismaClient';
import { UpdateBookCartDTO } from '../../dtos/UpdateBookCartDTO';
import { BookCart } from '../../entities/BookCart';
import { IBooksCartRepository } from '../@types/IBooksCartRepository';

export class BookCartRepository implements IBooksCartRepository {
  async update(data: UpdateBookCartDTO): Promise<BookCart> {
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

  async findById(id: string): Promise<BookCart | null> {
    const bookCart = await prisma.bookCart.findFirst({
      where: { id },
    });

    return bookCart;
  }

  async findByBookAndCartId(data: { bookId: string; cartId: string }): Promise<BookCart | null> {
    const { bookId, cartId } = data;

    const bookCart = await prisma.bookCart.findFirst({ where: { bookId, cartId } });

    return bookCart;
  }
}
