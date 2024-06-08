import { randomString } from 'remeda';
import { APP_URL, SPOTIFY_API_URL, SPOTIFY_CLIENT_ID } from 'src/constants';

/**
 * 認証URLエンティティ
 */
export class AuthUrlEntity {
  readonly url: string;
  // あとで検証するためにstateを保持
  readonly state: string;

  constructor() {
    const state = randomString(16);

    // クエリパラメータを生成
    const urlParams = new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'playlist-read-private streaming user-read-private',
      redirect_uri: `${APP_URL}/callback`,
      state,
    });

    // URLを生成
    try {
      this.url = new URL(
        `/authorize?${urlParams.toString()}`,
        SPOTIFY_API_URL,
      ).href;
    } catch (error) {
      throw new Error('URLが有効ではありません');
    }
    this.state = state;
  }
}
