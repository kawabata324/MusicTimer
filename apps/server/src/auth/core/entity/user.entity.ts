/**
 * ユーザーエンティティ
 */
export class UserEntity {
  readonly spotifyId: string;
  readonly spotifySubscriptionType: string;
  readonly name: string;
  readonly country: string;
  readonly profileImageUrl: string;

  constructor({
    spotifyId,
    spotifySubscriptionType,
    name,
    country,
    profileImageUrl,
  }: {
    spotifyId: string;
    spotifySubscriptionType: string;
    name?: string;
    country: string;
    profileImageUrl?: string;
  }) {
    this.spotifyId = spotifyId;
    this.spotifySubscriptionType = spotifySubscriptionType;
    this.name = name ?? 'ゲストユーザー';
    this.country = country;
    // TODO: あとでデフォルトの画像URLを設定
    this.profileImageUrl = profileImageUrl ?? 'https://via.placeholder.com/300';
  }
}
