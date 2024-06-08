import * as dotenv from 'dotenv';
import * as v from 'valibot';

dotenv.config();

/* ======= spotify ======== */
const SPOTIFY_CLIENT_ID = v.parse(v.string(), process.env.SPOTIFY_CLIENT_ID);

const SPOTIFY_CLIENT_SECRET = v.parse(
  v.string(),
  process.env.SPOTIFY_CLIENT_SECRET,
);

const SPOTIFY_API_URL = 'https://accounts.spotify.com';

/* ======= app ======== */
const APP_URL = v.parse(v.string(), process.env.APP_URL);

/** @public */
export { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, APP_URL, SPOTIFY_API_URL };
