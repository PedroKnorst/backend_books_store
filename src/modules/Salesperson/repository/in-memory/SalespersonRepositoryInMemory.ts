import { CreateSalespersonDTO } from '../../dtos/CreateSalespersonDTO';
import { UpdateSalespersonDTO } from '../../dtos/UpdateSalespersonDTO';
import { Salesperson } from '../../entities/Salesperson';
import { ISalespersonRepository } from '../@types/ISalesperson';

export class SalespersonRepositoryInMemory implements ISalespersonRepository {
  salespersons: Salesperson[] = [];

  constructor(seeds?: boolean) {
    if (seeds) {
      this.salespersons.push({
        id: 'salespersonId1',
        balance: 0,
        userId: 'userId1',
      });
      this.salespersons.push({
        id: 'salespersonId2',
        balance: 0,
        userId: 'userId2',
      });
    }
  }

  async create(data: CreateSalespersonDTO): Promise<{ id: string; balance: number | null; userId: string }> {}

  async findById(id: string): Promise<{ id: string; balance: number | null; userId: string } | null> {
    const salesperson = this.salespersons.find(currentSalesperson => currentSalesperson.id === id);

    return salesperson;
  }

  async update(data: UpdateSalespersonDTO): Promise<{ id: string; balance: number | null; userId: string }> {}
}
