import { Injectable } from '@nestjs/common';
import { isNonNullish } from 'remeda';
import { PrismaService } from 'src/libs';

import { UserEntity } from './user.entity';

/**
 * ユーザーリポジトリ
 */
@Injectable()
export class UserService {
  /**
   * コンストラクタ
   */
  constructor(private prisma: PrismaService) {}

  /**
   * ユーザを作成する
   */
  async create(user: UserEntity): Promise<UserEntity> {
    if (await this.isUserExistBySpotifyId(user.spotifyId)) {
      return user;
    }

    await this.prisma.user.create({
      data: {
        name: user.name,
        icon_url: user.iconUrl,
        country: user.country,
        spotify_auth: {
          create: {
            spotify_id: user.spotifyId,
            subscription_type: user.spotifySubscriptionType,
          },
        },
      },
    });

    return user;
  }

  /**
   * ユーザが存在するか
   */
  private async isUserExistBySpotifyId(spotifyId: string): Promise<boolean> {
    // TODO: ユーザーが存在するかの判定に修正する
    const spotifyAuth = await this.prisma.spotifyAuth.findUnique({
      where: {
        spotify_id: spotifyId,
      },
    });

    return isNonNullish(spotifyAuth);
  }
}
