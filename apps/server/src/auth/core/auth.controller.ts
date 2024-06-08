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

  /**
   * ログインエンドポイント
   * 認証URLを生成し、レスポンスにstateをクッキーとして設定
   */
  @Get('login')
  @Redirect()
  getDocs(@Res({ passthrough: true }) response: Response): AuthUrlEntity {
    const authUrl = this.authService.createAuthUrl();

    response.cookie('state', authUrl.state);
    return authUrl;
  }

  /**
   * コールバックエンドポイント
   * クエリパラメータとリクエストオブジェクトを受け取り、認証の結果を返す
   */
  @Get('callback')
  callback(
    @Query() query: CreateAuthTokenDto,
    @Req() request: Request,
  ): string {
    if (query.error) {
      throw new BadRequestException('認証に失敗しました');
    }
    if (query.state !== request.cookies.state) {
      throw new BadRequestException('stateが一致しません');
    }

    return '';
  }
}
