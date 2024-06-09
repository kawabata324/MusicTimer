import { Module } from '@nestjs/common';
import { UserService } from 'src/_shared/user';
import { PrismaService } from 'src/libs';

import { AuthService, AuthController } from './core';

/**
 * 認証モジュール
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
