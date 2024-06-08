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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect()
  getDocs(@Res({ passthrough: true }) response: Response): AuthUrlEntity {
    const authUrl = this.authService.createAuthUrl();

    response.cookie('state', authUrl.state);
    return authUrl;
  }

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
