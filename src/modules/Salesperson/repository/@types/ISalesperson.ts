import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { UpdateSalespersonDTO } from '../../dtos/UpdateSalespersonDTO';
import { Salesperson } from '../../entities/Salesperson';

export interface ISalespersonRepository {
  create(data: CreateSalespersonDTO): Promise<Salesperson>;
  findById(id: string): Promise<Salesperson | null>;
  update(data: UpdateSalespersonDTO): Promise<Salesperson>;
}
