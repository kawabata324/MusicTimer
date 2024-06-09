import { Injectable } from '@nestjs/common';
import SpotifyWebApi from 'spotify-web-api-node';
import { first, isArray } from 'remeda';

import { UserEntity } from 'src/_shared/user';
import { UserService } from 'src/_shared/user';

import { AuthCodeGrantEntity, AuthUrlEntity } from './entity';
import { GetAuthCodeGrantDto } from './dto';

/**
 * 認証サービスクラス
 */
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * 認証URLを生成する
   */
  createAuthUrl(): AuthUrlEntity {
    return new AuthUrlEntity();
  }

  /**
   * 認証コードを取得する
   * Userの登録 すでに登録されている場合はスキップ
   */
  async getAuthCodeGrant({
    code,
  }: GetAuthCodeGrantDto): Promise<AuthCodeGrantEntity> {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      accessToken: code,
    });
    // TODO: あとで、エラーハンドリングを追加する
    const { body } = await spotifyApi.authorizationCodeGrant(code);

    await this.registerUser(spotifyApi);

    return new AuthCodeGrantEntity(body);
  }

  /**
   * ユーザーを登録する
   */
  private async registerUser(api: SpotifyWebApi): Promise<void> {
    // TODO: あとで、エラーハンドリングを追加する
    const { body: me } = await api.getMe();
    const user = new UserEntity({
      spotifyId: me.id,
      spotifySubscriptionType: me.product,
      name: me.display_name,
      country: me.country,
      iconUrl: isArray(me.images) ? first(me.images)?.url : undefined,
    });
    await this.userService.create(user);
  }
}
