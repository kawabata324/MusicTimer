import { BadRequestException } from '@nestjs/common';
import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { ValidationPipe } from './ValidationPipe';

describe('ValidationPipe', () => {
  const scheme = v.object({
    email: v.pipe(v.string(), v.email()),
    name: v.string(),
    age: v.number(),
  });
  const validationPipe = new ValidationPipe(scheme);

  it('Schemaと一致する場合、値が返されること', () => {
    const value = { email: 'kawabata@example.com', name: 'かわばた', age: 20 };
    const transformedValue = validationPipe.transform(value);
    expect(transformedValue).toEqual(value);
  });

  it('Schemaと一致しない場合、エラーがthrowされること', () => {
    const value = { name: 'かわばた', age: 'invalid' };
    expect(() => validationPipe.transform(value)).toThrow(BadRequestException);
  });
});
