import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Cookie parser を有効化
  app.use(cookieParser());

  // Swagger の設定
  const config = new DocumentBuilder()
    .setTitle('Music Pomodoro')
    .setDescription('The Music Pomodoro API description')
    .setVersion('1.0')
    .addTag('music-pomodoro')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
