import { Injectable } from '@nestjs/common';
import { isNonNullish } from 'remeda';
import { UserEntity } from 'src/_shared/core/entity';
import { PrismaService } from 'src/libs';

/**
 * ユーザーリポジトリ
 */
@Injectable()
export class UserRepository {
  constructor(
    private readonly model: UserEntity,
    private prisma: PrismaService,
  ) {}

  /**
   * ユーザを作成する
   */
  async create(user: UserEntity): Promise<UserEntity> {
    if (await this.isUserExist(user.spotifyId)) {
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
  async isUserExist(spotifyId: string): Promise<boolean> {
    const spotifyAuth = await this.prisma.spotifyAuth.findUnique({
      where: {
        spotify_id: spotifyId,
      },
    });

    return isNonNullish(spotifyAuth);
  }
}
