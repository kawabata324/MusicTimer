import { Module } from '@nestjs/common';
import { PrismaService } from 'src/libs';

import { UserService } from './core';

@Module({
  providers: [UserService, PrismaService],
})
export class UserModule {}
