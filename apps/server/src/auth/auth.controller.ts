import {
  Controller,
  Get,
  Redirect,
  Res,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { CallbackRequestQuery, LoginResponse } from './auth.model';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect()
  getDocs(@Res({ passthrough: true }) response: Response): LoginResponse {
    const model = this.authService.createSpotifyAuthRedirect();

    response.cookie('state', model.state);
    return { url: model.redirectUrl.href };
  }

  @Get('callback')
  callback(
    @Query() query: CallbackRequestQuery,
    @Req() request: Request,
    @Res() response: Response,
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
