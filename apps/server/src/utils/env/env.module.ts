import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
// 分割してimportするとエラーになるので以下の書き方をしている
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      validationSchema: Joi.object({
        SPOTIFY_CLIENT_ID: Joi.string().required(),
        BACKEND_URL: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
