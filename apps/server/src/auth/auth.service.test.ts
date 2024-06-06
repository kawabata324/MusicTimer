import { AuthService } from './auth.service';
import { EnvService } from 'src/utils/env/env.service';
import { describe, test, expect } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { SpotifyAuthRedirect } from './auth.model';

describe('AuthService', () => {
  const configService = new ConfigService();
  const envService = new EnvService(configService);
  const authService = new AuthService(envService);

  describe('createSpotifyAuthRedirect', () => {
    test('response_typeが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(
        spotifyAuthRedirect.redirectUrl.searchParams.get('response_type'),
      ).toBe('code');
    });

    test('client_idが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(
        spotifyAuthRedirect.redirectUrl.searchParams.get('client_id'),
      ).toBe(envService.SpotifyClientId);
    });

    test('scopeが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(spotifyAuthRedirect.redirectUrl.searchParams.get('scope')).toBe(
        'playlist-read-private streaming user-read-private',
      );
    });

    test('redirect_uriが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(
        spotifyAuthRedirect.redirectUrl.searchParams.get('redirect_uri'),
      ).toBe(`${envService.BackendUrl}/callback`);
    });

    test('stateが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(spotifyAuthRedirect.state).toHaveLength(16);
    });
  });
});
