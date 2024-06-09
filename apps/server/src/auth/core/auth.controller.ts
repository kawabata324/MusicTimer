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
import { ApiTags } from '@nestjs/swagger';

import { GetAuthCodeGrantDto } from './dto';
import { AuthService } from './auth.service';
import { AuthCodeGrantEntity, AuthUrlEntity } from './entity';
import { CallbackDoc, LoginDoc } from './auth.doc';

/**
 * 認証コントローラークラス
 */
@Controller()
@ApiTags('ユーザー認証')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly authStateKey = 'music-timer-auth.state';

  /**
   * ログインエンドポイント
   * 認証URLを生成し、レスポンスにstateをクッキーとして設定
   */
  @Get('login')
  @Redirect()
  @LoginDoc()
  login(@Res({ passthrough: true }) res: Response): AuthUrlEntity {
    const authUrl = this.authService.createAuthUrl();

    res.cookie(this.authStateKey, authUrl.state, {
      secure: false,
    });

    return authUrl;
  }

  /**
   * コールバックエンドポイント
   * 認証コードを取得し、SpotifyWebApiを生成
   */
  @Get('callback')
  @CallbackDoc()
  async callback(
    @Query() query: GetAuthCodeGrantDto,
    @Req() req: Request,
  ): Promise<AuthCodeGrantEntity> {
    if (query.error) {
      throw new BadRequestException('認証に失敗しました');
    }
    if (query.state !== req.cookies[this.authStateKey]) {
      throw new BadRequestException('stateが一致しません');
    }

    return await this.authService.getAuthCodeGrant(query);
  }
}
