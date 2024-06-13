import { Salesperson } from '@prisma/client';
import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';

export interface ISalespersonRepository {
  create(data: CreateSalespersonDTO): Promise<Salesperson>;
  findById(id: string): Promise<Salesperson | null>;
}
