import { Injectable } from '@nestjs/common';
import { randomString } from 'remeda';
import { EnvService } from 'src/utils/env/env.service';
import { CallbackRequestQuery, SpotifyAuthRedirect } from './auth.model';

@Injectable()
export class AuthService {
  constructor(private env: EnvService) {}
  private readonly baseUrl = 'https://accounts.spotify.com';
  private readonly redirectUri = `${this.env.BackendUrl}/callback`;

  createSpotifyAuthRedirect(): SpotifyAuthRedirect {
    const state = randomString(16);
    const urlParams = new URLSearchParams({
      response_type: 'code',
      client_id: this.env.SpotifyClientId,
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
