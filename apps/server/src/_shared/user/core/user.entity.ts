/**
 * ユーザーエンティティ
 */
export class UserEntity {
  readonly spotifyId: string;
  readonly spotifySubscriptionType: string;
  readonly name: string;
  readonly country: string;
  readonly iconUrl: string;

  /**
   * コンストラクタ
   */
  constructor({
    spotifyId,
    spotifySubscriptionType,
    name,
    country,
    iconUrl,
  }: {
    spotifyId: string;
    spotifySubscriptionType: string;
    name?: string;
    country: string;
    iconUrl?: string;
  }) {
    this.spotifyId = spotifyId;
    this.spotifySubscriptionType = spotifySubscriptionType;
    this.name = name ?? 'ゲストユーザー';
    this.country = country;
    // TODO: あとでデフォルトの画像URLを設定
    this.iconUrl = iconUrl ?? 'https://via.placeholder.com/300';
  }
}
