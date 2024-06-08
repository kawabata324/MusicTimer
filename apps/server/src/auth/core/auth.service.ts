import { Injectable } from '@nestjs/common';
import { AuthUrlEntity } from './entity';

/**
 * 認証サービスクラス
 */
@Injectable()
export class AuthService {
  constructor() {}
  /**
   * 認証URLを生成する
   */
  createAuthUrl(): AuthUrlEntity {
    return new AuthUrlEntity();
  }
}
