import { Salesperson } from '@prisma/client';
import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { ISalespersonRepository } from '../@types/ISalesperson';
import prisma from '#/database/PrismaClient';

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
}
