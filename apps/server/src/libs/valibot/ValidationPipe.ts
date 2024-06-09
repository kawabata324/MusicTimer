import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as v from 'valibot';

/**
 * バリデーションパイプ
 * schemaを元にバリデーションを行う
 */
export class ValidationPipe<T> implements PipeTransform {
  /**
   * コンストラクタ
   */
  constructor(private schema: v.BaseSchema<T, unknown, v.BaseIssue<T>>) {}

  /**
   *  バリデーション
   */
  transform(value: T): T {
    try {
      v.parse(this.schema, value);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
