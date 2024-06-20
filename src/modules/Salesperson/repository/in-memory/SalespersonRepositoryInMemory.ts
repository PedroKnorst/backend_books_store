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

  async create(data: CreateSalespersonDTO, id?: string): Promise<Salesperson> {
    const salesperson = new Salesperson({ ...data, balance: 0 }, id);

    this.salespersons.push(salesperson);

    return salesperson;
  }

  async findById(id: string): Promise<Salesperson | null> {
    const salesperson = this.salespersons.find(currentSalesperson => currentSalesperson.id === id);

    return salesperson || null;
  }

  async update(data: UpdateSalespersonDTO): Promise<Salesperson> {
    const { balance, id } = data;

    const salespersonIndex = this.salespersons.findIndex(currentSalesperson => currentSalesperson.id === id);

    let salesperson = this.salespersons[salespersonIndex];

    salesperson.balance = balance;

    const filteredSalesperson = this.salespersons.filter(currentSalesperson => currentSalesperson.id !== id);

    filteredSalesperson.push(salesperson);

    this.salespersons = filteredSalesperson;

    return salesperson;
  }
}
