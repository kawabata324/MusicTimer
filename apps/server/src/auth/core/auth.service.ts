import { Injectable } from '@nestjs/common';
import SpotifyWebApi from 'spotify-web-api-node';
import { first, isArray } from 'remeda';

import { UserEntity } from 'src/_shared/core/entity';
import { UserRepository } from 'src/_shared/core/repository';

import { AuthUrlEntity } from './entity';
import { RegisterUserDto } from './dto';

/**
 * 認証サービスクラス
 */
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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
  async registerUser({ code }: RegisterUserDto): Promise<UserEntity> {
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
      iconUrl: isArray(body.images) ? first(body.images)?.url : undefined,
    });

    return this.userRepository.create(user);
  }
}
