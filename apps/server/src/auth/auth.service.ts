import { Injectable } from '@nestjs/common';
import { randomString } from 'remeda';
import { CallbackRequestQuery, SpotifyAuthRedirect } from './auth.model';
import { APP_URL, SPOTIFY_CLIENT_ID } from 'src/constants';

@Injectable()
export class AuthService {
  constructor() {}
  private readonly baseUrl = 'https://accounts.spotify.com';
  private readonly redirectUri = `${APP_URL}/callback`;

  createSpotifyAuthRedirect(): SpotifyAuthRedirect {
    const state = randomString(16);
    const urlParams = new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'playlist-read-private streaming user-read-private',
      redirect_uri: this.redirectUri,
      state: randomString(16),
    });

    return {
      redirectUrl: new URL(`/authorize?${urlParams.toString()}`, this.baseUrl),
      state,
    };
  }

  createAuthToken({ state, code }: CallbackRequestQuery): string {
    // TODO: Implement
    return '';
  }
}
