import * as v from 'valibot';

export const registerUserDto = v.object({
  code: v.string(),
  state: v.string(),
  error: v.optional(v.string()),
});

export type RegisterUserDto = v.InferInput<typeof registerUserDto>;
