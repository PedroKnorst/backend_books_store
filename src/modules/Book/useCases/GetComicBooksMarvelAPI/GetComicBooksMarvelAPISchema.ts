import { z } from 'zod';

export const GetComicBooksMarvelAPISchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
});
