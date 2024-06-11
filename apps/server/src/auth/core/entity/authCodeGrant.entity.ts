/**
 * 認証コードのエンティティ
 */
export class AuthCodeGrantEntity {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;

  /**
   * コンストラクタ
   */
  constructor(
    private readonly data: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    },
  ) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresIn = data.expiresIn;
  }
}
