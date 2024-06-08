import { Injectable } from '@nestjs/common';
import { AuthUrlEntity, UserEntity } from './entity';
import { RegisterUserDto } from './dto';
import SpotifyWebApi from 'spotify-web-api-node';
import { first, isArray } from 'remeda';

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

  /**
   * ユーザを登録する
   * 認証コードをセットし、SpotifyWebApiを生成する
   */
  async registerUser({ code }: RegisterUserDto): Promise<string> {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      accessToken: code,
    });

    // TODO: あとで、エラーハンドリングを追加する
    const { body } = await spotifyApi.getMe();

    const user = new UserEntity({
      spotifyId: body.id,
      spotifySubscriptionType: body.product,
      name: body.display_name,
      country: body.country,
      profileImageUrl: isArray(body.images)
        ? first(body.images)?.url
        : undefined,
    });

    return 'Hello, World!';
  }
}
