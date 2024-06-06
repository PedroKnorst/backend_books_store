import { z } from 'zod';

export const authUserSchema = z.object({
  email: z.string({ invalid_type_error: 'Email inválido', required_error: 'O email é obrigatório' }),
  password: z.string({ invalid_type_error: 'Senha inválida', required_error: 'A senha é obrigatória' }),
});
