import { describe, test, expect } from 'vitest';

import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  describe('constructor', () => {
    test('ネームが空の場合、デフォルトの名前が設定される', () => {
      const user = new UserEntity({
        spotifyId: 'spotifyId',
        spotifySubscriptionType: 'spotifySubscriptionType',
        country: 'country',
      });

      expect(user.name).toBe('ゲストユーザー');
    });

    test('アイコンURLが空の場合、デフォルトのアイコンURLが設定される', () => {
      const user = new UserEntity({
        spotifyId: 'spotifyId',
        spotifySubscriptionType: 'spotifySubscriptionType',
        country: 'country',
      });

      expect(user.iconUrl).toBe('https://via.placeholder.com/300');
    });

    test('引数が正しい場合、各プロパティが設定される', () => {
      const user = new UserEntity({
        spotifyId: 'spotifyId',
        spotifySubscriptionType: 'spotifySubscriptionType',
        name: 'name',
        country: 'country',
        iconUrl: 'iconUrl',
      });

      expect(user.spotifyId).toBe('spotifyId');
      expect(user.spotifySubscriptionType).toBe('spotifySubscriptionType');
      expect(user.name).toBe('name');
      expect(user.country).toBe('country');
      expect(user.iconUrl).toBe('iconUrl');
    });
  });
});
