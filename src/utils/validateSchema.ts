import { AppError } from '#/http/middlewares/ErrorHandler';
import { ZodError, z } from 'zod';

export function validateSchema(validationData: Object, schema: z.AnyZodObject) {
  try {
    schema.parse(validationData);
  } catch (err) {
    const error = `${(err as ZodError).issues[0].path[0]} ${(err as ZodError).issues[0].message}`;
    const errorCapitalized = error.charAt(0).toUpperCase() + error.slice(1);
    throw new AppError(errorCapitalized);
  }
}
