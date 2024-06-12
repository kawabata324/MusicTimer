import { UserService } from 'src/_shared/user';
import { PrismaService } from 'src/libs';
import { describe, test, expect } from 'vitest';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  describe('createAuthUrl', () => {
    test('認証URLを生成できること', () => {
      const authService = new AuthService(new UserService(new PrismaService()));

      const authUrl = authService.createAuthUrl();

      expect(authUrl).toBeDefined();
    });
  });
});
