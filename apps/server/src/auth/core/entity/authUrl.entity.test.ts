import { APP_URL, SPOTIFY_CLIENT_ID } from 'src/constants';
import { describe, test, expect } from 'vitest';

import { AuthUrlEntity } from './authUrl.entity';

describe('AuthUrlEntity', () => {
  test('コンストラクタ', () => {
    const authUrlEntity = new AuthUrlEntity();

    expect(authUrlEntity.url).toBe(
      `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${APP_URL}/callback&scope=playlist-read-private%20streaming%20user-read-private&state=${authUrlEntity.state}`,
    );
  });
});
