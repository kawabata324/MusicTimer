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

import { RegisterUserDto } from './dto';
import { AuthService } from './auth.service';
import { AuthUrlEntity } from './entity';
import { UserEntity } from 'src/_shared/core/entity';

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
   * 認証コードを取得し、SpotifyWebApiを生成
   */
  @Get('callback')
  async callback(
    @Query() query: RegisterUserDto,
    @Req() req: Request,
  ): Promise<UserEntity> {
    if (query.error) {
      throw new BadRequestException('認証に失敗しました');
    }
    if (query.state !== req.cookies[this.authStateKey]) {
      throw new BadRequestException('stateが一致しません');
    }

    return await this.authService.registerUser(query);
  }
}
