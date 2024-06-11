import { describe, test, expect } from 'vitest';

import { AuthCodeGrantEntity } from './authCodeGrant.entity';

describe('AuthCodeGrantEntity', () => {
  test('コンストラクタ', () => {
    const authCodeGrantEntity = new AuthCodeGrantEntity({
      accessToken: 'accessToken',
      refreshToken: 'refresh',
      expiresIn: 100,
    });

    expect(authCodeGrantEntity.accessToken).toBe('accessToken');
    expect(authCodeGrantEntity.refreshToken).toBe('refresh');
    expect(authCodeGrantEntity.expiresIn).toBe(100);
  });
});
