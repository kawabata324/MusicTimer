import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as v from 'valibot';

/**
 * バリデーションパイプ
 * schemaを元にバリデーションを行う
 */
export class ValidationPipe<T> implements PipeTransform {
  constructor(private schema: v.BaseSchema<T, unknown, v.BaseIssue<T>>) {}

  transform(value: T): T {
    try {
      v.parse(this.schema, value);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
