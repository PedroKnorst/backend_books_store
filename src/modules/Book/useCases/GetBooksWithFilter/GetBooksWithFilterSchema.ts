import { z } from 'zod';

export const GetBooksWithFilterSchema = z.object({
  page: z.number().min(1, 'A pagina deve ser maior que 0'),
  size: z.number().min(1, 'O tamanho deve ser maior que 0'),
});
