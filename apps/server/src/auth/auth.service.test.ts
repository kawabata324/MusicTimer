import { AuthService } from './auth.service';
import { describe, test, expect } from 'vitest';
import { SpotifyAuthRedirect } from './auth.model';

describe('AuthService', () => {
  const authService = new AuthService();

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
      ).toBe(process.env.SPOTIFY_CLIENT_ID);
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
      ).toBe(`${process.env.APP_URL}/callback`);
    });

    test('stateが正しいこと', () => {
      const spotifyAuthRedirect: SpotifyAuthRedirect =
        authService.createSpotifyAuthRedirect();
      expect(spotifyAuthRedirect.state).toHaveLength(16);
    });
  });
});
