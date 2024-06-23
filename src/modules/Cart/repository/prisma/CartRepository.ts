import prisma from '#/database/PrismaClient';
import { AddBookToCartDTO } from '../../dtos/AddBookToCartDTO';
import { RemoveBookOfCartDTO } from '../../dtos/RemoveBookOfCartDTO';
import { UpdateCartDTO } from '../../dtos/UpdateCartDTO';
import { Cart } from '../../entities/Cart';
import { ICartRepository } from '../@types/ICartRepository';
import { Prisma } from '@prisma/client';

export class CartRepository implements ICartRepository {
  async addBookToCart(data: AddBookToCartDTO): Promise<Cart> {
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

  async removeBookOfCart(data: RemoveBookOfCartDTO): Promise<Cart> {
    const cart = await prisma.cart.update({
      where: { id: data.id },
      data: { BooksCart: { delete: { id: data.bookCartId } }, totalPrice: data.cartTotalPrice },
      include: { BooksCart: true },
    });

    return cart;
  }

  async findCartByClient(clientId: string): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({
      where: { clientId },
      include: { BooksCart: { include: { Book: { include: { Salesperson: true, Image: true } } } } },
    });

    return cart;
  }

  async create(): Promise<Cart> {
    const cart = await prisma.cart.create({ data: {} });

    return cart;
  }

  async update(data: UpdateCartDTO): Promise<Cart> {
    let dataPrisma: Prisma.CartUpdateInput = {};

    const { id, bookCartId, clientId, totalPrice } = data;

    if (clientId) {
      dataPrisma.clientId = clientId;
    }

    if (bookCartId) {
      dataPrisma.BooksCart = { delete: { id: bookCartId } };
    }

    if (totalPrice) {
      dataPrisma.totalPrice = totalPrice;
    }

    const cart = await prisma.cart.update({
      data: dataPrisma,
      where: { id },
    });

    return cart;
  }
}
