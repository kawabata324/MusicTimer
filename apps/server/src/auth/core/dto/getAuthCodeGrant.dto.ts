import * as v from 'valibot';

/**
 * 認証コードを得るために必要な情報
 */
export const getAuthCodeGrantDto = v.object({
  code: v.string(),
  state: v.string(),
  error: v.optional(v.string()),
});

/**
 * 認証コードを得るために必要な情報
 */
export type GetAuthCodeGrantDto = v.InferInput<typeof getAuthCodeGrantDto>;
