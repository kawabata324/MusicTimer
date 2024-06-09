import { randomString } from 'remeda';
import SpotifyWebApi from 'spotify-web-api-node';
import { APP_URL, SPOTIFY_CLIENT_ID } from 'src/constants';

/**
 * 認証URLエンティティ
 */
export class AuthUrlEntity {
  readonly url: string;
  // あとで検証するためにstateを保持
  readonly state: string;

  constructor() {
    const state = randomString(16);

    // 認証URLを生成
    // https://github.com/thelinmichael/spotify-web-api-node?tab=readme-ov-file#implicit-grant-flow
    const spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      redirectUri: `${APP_URL}/callback`,
    });

    this.url = spotifyApi.createAuthorizeURL(
      ['playlist-read-private', 'streaming', 'user-read-private'],
      state,
    );
    this.state = state;
  }
}
