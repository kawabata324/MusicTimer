import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prismaサービスクラス
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * モジュール初期化時の処理
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
