import { IBooksRepository } from '../../repository/@types/IBooksRepository';

export class FindByIdUseCase {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(id: string) {
    const book = await this.booksRepository.findByid(id);

    return book;
  }
}
