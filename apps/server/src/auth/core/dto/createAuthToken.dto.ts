import * as v from 'valibot';

export const createAuthTokenDto = v.object({
  code: v.string(),
  state: v.string(),
  error: v.optional(v.string()),
});

export type CreateAuthTokenDto = v.InferInput<typeof createAuthTokenDto>;
