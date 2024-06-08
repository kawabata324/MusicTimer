import {
  Controller,
  Get,
  Redirect,
  Res,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { CreateAuthTokenDto } from './dto';
import { AuthService } from './auth.service';
import { AuthUrlEntity } from './entity';

/**
 * 認証コントローラークラス
 */
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly authStateKey = 'music-timer-auth.state';

  /**
   * ログインエンドポイント
   * 認証URLを生成し、レスポンスにstateをクッキーとして設定
   */
  @Get('login')
  @Redirect()
  login(@Res({ passthrough: true }) res: Response): AuthUrlEntity {
    const authUrl = this.authService.createAuthUrl();

    res.cookie(this.authStateKey, authUrl.state, {
      secure: false,
    });

    return authUrl;
  }

  /**
   * コールバックエンドポイント
   * クエリパラメータとリクエストオブジェクトを受け取り、認証の結果を返す
   */
  @Get('callback')
  callback(@Query() query: CreateAuthTokenDto, @Req() req: Request): string {
    if (query.error) {
      throw new BadRequestException('認証に失敗しました');
    }
    if (query.state !== req.cookies[this.authStateKey]) {
      throw new BadRequestException('stateが一致しません');
    }

    return 'Hello, World!';
  }
}
