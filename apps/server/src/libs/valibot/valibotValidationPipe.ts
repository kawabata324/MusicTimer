import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BaseIssue, BaseSchema, parse } from 'valibot';

export class ValibotValidationPipe<T> implements PipeTransform {
  constructor(private scheme: BaseSchema<unknown, T, BaseIssue<unknown>>) {}

  transform(value: unknown): T {
    try {
      return parse(this.scheme, value);
    } catch (e) {
      throw new BadRequestException('Validation failed');
    }
  }
}
