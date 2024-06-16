import { Salesperson } from '@prisma/client';
import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { ISalespersonRepository } from '../@types/ISalesperson';
import prisma from '#/database/PrismaClient';
import { UpdateSalespersonDTO } from '../../dtos/UpdateSalespersonDTO';

export class SalespersonRepository implements ISalespersonRepository {
  async create(data: CreateSalespersonDTO): Promise<Salesperson> {
    const salesperson = await prisma.salesperson.create({
      data: {
        User: { connect: { id: data.userId } },
      },
    });

    return salesperson;
  }

  async findById(id: string): Promise<Salesperson | null> {
    const salesperson = await prisma.salesperson.findFirst({ where: { id } });

    return salesperson;
  }

  async update(data: UpdateSalespersonDTO): Promise<{ id: string; balance: number | null; userId: string }> {
    const salesperson = await prisma.salesperson.update({ where: { id: data.id }, data: { balance: data.balance } });

    return salesperson;
  }
}
