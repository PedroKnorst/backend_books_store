import { Salesperson } from '@prisma/client';
import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { UpdateSalespersonDTO } from '../../dtos/UpdateSalespersonDTO';

export interface ISalespersonRepository {
  create(data: CreateSalespersonDTO): Promise<Salesperson>;
  findById(id: string): Promise<Salesperson | null>;
  update(data: UpdateSalespersonDTO): Promise<Salesperson>;
}
