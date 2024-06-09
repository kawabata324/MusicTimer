import { Module } from '@nestjs/common';
import { UserModule } from 'src/_shared';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
