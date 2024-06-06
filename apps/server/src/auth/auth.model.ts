import * as v from 'valibot';

/**
 * GET:/login
 */
export type SpotifyAuthRedirect = {
  redirectUrl: URL;
  state: string;
};

export type LoginResponse = {
  url: string;
};

/**
 * GET:/callback
 */
const callbackRequestQuerySchema = v.object({
  code: v.string(),
  state: v.string(),
  error: v.optional(v.string()),
});
export type CallbackRequestQuery = v.InferInput<
  typeof callbackRequestQuerySchema
>;
