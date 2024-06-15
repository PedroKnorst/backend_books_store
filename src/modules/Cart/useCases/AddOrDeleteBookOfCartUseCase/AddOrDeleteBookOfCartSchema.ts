import { z } from 'zod';

export const AddOrDeleteBookOfCartSchema = z.object({
  bookId: z.string().min(1, 'O livro é obrigatório'),
});
