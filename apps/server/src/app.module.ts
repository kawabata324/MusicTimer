import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
