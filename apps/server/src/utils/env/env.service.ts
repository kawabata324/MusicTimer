import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * 環境変数をラップして使いやすくたもの
 */
@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get SpotifyClientId(): string {
    return this.configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
  }

  get BackendUrl(): string {
    return this.configService.getOrThrow<string>('BACKEND_URL');
  }
}
