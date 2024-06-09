/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiFoundResponse,
} from '@nestjs/swagger';

import { AuthCodeGrantEntity, AuthUrlEntity } from './entity';

/**
 * ログインエンドポイントのAPIドキュメント
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const LoginDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'ログインエンドポイント',
      description: '認証URLを生成し、レスポンスにstateをクッキーとして設定',
    }),
    ApiFoundResponse({
      description: '認証URLを返却',
      type: AuthUrlEntity,
    }),
  );
};

/**
 * コールバックエンドポイントのAPIドキュメント
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const CallbackDoc = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'コールバックエンドポイント',
      description: '認証コードを取得する',
    }),
    ApiOkResponse({
      description: '認証コードを返却',
      type: AuthCodeGrantEntity,
    }),
    ApiBadRequestResponse({
      description: '認証に失敗しました',
    }),
    ApiUnauthorizedResponse({
      description: 'stateが一致しません',
    }),
  );
};
