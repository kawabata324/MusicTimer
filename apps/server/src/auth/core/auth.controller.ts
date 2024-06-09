import {
  Controller,
  Get,
  Redirect,
  Res,
  Query,
  Req,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ValidationPipe } from 'src/libs';

import { CallbackDoc, LoginDoc } from './auth.doc';
import { AuthService } from './auth.service';
import { GetAuthCodeGrantDto, getAuthCodeGrantDto } from './dto';
import { AuthCodeGrantEntity, AuthUrlEntity } from './entity';

/**
 * 認証コントローラークラス
 */
@Controller()
@ApiTags('ユーザー認証')
export class AuthController {
  /**
   * コンストラクタ
   */
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
  @UsePipes(new ValidationPipe(getAuthCodeGrantDto))
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
