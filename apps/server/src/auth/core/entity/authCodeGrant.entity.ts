/**
 * 認証コードのエンティティ
 */
export class AuthCodeGrantEntity {
  constructor(
    private readonly data: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    },
  ) {}
}
