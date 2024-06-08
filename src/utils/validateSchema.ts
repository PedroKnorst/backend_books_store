import { AppError } from '#/http/middlewares/ErrorHandler';
import { ZodError, z } from 'zod';

export function validateSchema(validationData: Object, schema: z.AnyZodObject) {
  try {
    schema.parse(validationData);
  } catch (err) {
    const error = `${(err as ZodError).errors[0].message}`;
    throw new AppError(error);
  }
}
