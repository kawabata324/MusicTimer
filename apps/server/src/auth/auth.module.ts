import { Module } from '@nestjs/common';
import { AuthService, AuthController } from './core';
import { UserService } from 'src/_shared/user';
import { PrismaService } from 'src/libs';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
