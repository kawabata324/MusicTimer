import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './utils/env/env.module';

@Module({
  imports: [AuthModule, EnvModule],
})
export class AppModule {}
