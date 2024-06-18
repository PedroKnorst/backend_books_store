import { BookCategory } from '@prisma/client';
import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string({ required_error: 'O título é obrigatório!' }).min(1, 'O título é obrigatório!'),
  author: z.string({ required_error: 'O autor é obrigatório!' }).min(1, 'O autor é obrigatório!'),
  character: z.string({ required_error: 'O personagem é obrigatório!' }).min(1, 'O personagem é obrigatório!'),
  description: z.string({ required_error: 'A descrição é obrigatória!' }).min(1, 'A descrição é obrigatória!'),
  price: z.number().refine(price => price >= 0, { message: 'O preço deve ser 0 ou maior!' }),
  storage: z.number().refine(storage => storage >= 0, { message: 'O estoque deve ser 0 ou maior!' }),
  publishDate: z.date().optional(),
  salespersonId: z.string({ required_error: 'O vendedor é obrigatório!' }).min(1, 'O vendedor é obrigatório!'),
  category: z.nativeEnum(BookCategory, { message: 'Esta categoria não existe!' }),
});
