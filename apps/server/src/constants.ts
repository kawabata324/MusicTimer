import * as dotenv from 'dotenv';
import * as v from 'valibot';

dotenv.config();

export const SPOTIFY_CLIENT_ID = v.parse(
  v.string(),
  process.env.SPOTIFY_CLIENT_ID,
);

export const SPOTIFY_CLIENT_SECRET = v.parse(
  v.string(),
  process.env.SPOTIFY_CLIENT_SECRET,
);

export const APP_URL = v.parse(v.string(), process.env.APP_URL);
