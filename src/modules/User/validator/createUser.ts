import { z } from 'zod';

const profileSchema = z.union([z.literal('SALESPERSON'), z.literal('CLIENT')]);

export const createUserSchema = z.object({
  email: z.string({ invalid_type_error: 'Email inválido', required_error: 'O email é obrigatório' }),
  name: z.string({ invalid_type_error: 'Nome inválido', required_error: 'O nome é obrigatório' }),
  password: z.string({ invalid_type_error: 'Senha inválida', required_error: 'A senha é obrigatória' }),
  profile: profileSchema,
  phone: z.string().optional(),
});
