import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Cookie parser を有効化
  app.use(cookieParser());

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
