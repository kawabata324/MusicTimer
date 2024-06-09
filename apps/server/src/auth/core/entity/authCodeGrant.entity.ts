/**
 * 認証コードのエンティティ
 */
export class AuthCodeGrantEntity {
  /**
   * コンストラクタ
   */
  constructor(
    private readonly data: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    },
  ) {}
}
