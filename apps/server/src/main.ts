import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

/**
 * アプリケーションの起動
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Cookie parser を有効化
  app.use(cookieParser());

  // swagger の設定
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Music Timer API')
        .setDescription('Music Timer API 定義')
        .setVersion('0.0')
        .build(),
    ),
  );

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
