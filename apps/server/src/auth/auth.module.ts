import { Module } from '@nestjs/common';
import { AuthService, AuthController } from './core';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})

/** @public */
export class AuthModule {}
