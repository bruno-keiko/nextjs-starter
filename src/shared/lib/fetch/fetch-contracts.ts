import { ZodType } from 'zod';

export class FetchContracts {
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: unknown): Data => {
      if (process.env.NODE_ENV === 'production') return response as Data;
      const validation = schema.safeParse(response);
      if (validation.error) {
        throw new Error(validation.error.message);
      }
      return validation.data;
    };
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data);
    if (process.env.NODE_ENV === 'production') return data;
    if (validation.error) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
