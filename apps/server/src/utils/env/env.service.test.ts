import { describe, expect, test } from 'vitest';
import { EnvService } from './env.service';
import { ConfigService } from '@nestjs/config';

describe('EnvService', () => {
  const configService = new ConfigService();
  const envService = new EnvService(configService);

  describe('SpotifyClientId', () => {
    test('環境変数から値が正しく受け取れること', () => {
      expect(envService.SpotifyClientId).toBe('dummy-spotify-client-id');
    });
  });

  describe('BackendUrl', () => {
    test('環境変数から値が正しく受け取れること', () => {
      expect(envService.BackendUrl).toBe('http://localhost:3000');
    });
  });
});
