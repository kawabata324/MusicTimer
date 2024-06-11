import { parse } from 'valibot';
import { describe, expect, test } from 'vitest';

import { getAuthCodeGrantDto } from './getAuthCodeGrant.dto';

describe('getAuthCodeGrantDto', () => {
  test('正しい値の場合、値が返ること', () => {
    const value = {
      code: 'code',
      state: 'state',
    };

    expect(parse(getAuthCodeGrantDto, value)).toEqual(value);
  });

  test('codeがない場合、エラーが返ること', () => {
    const value = {
      state: 'state',
    };

    expect(() => parse(getAuthCodeGrantDto, value)).toThrow();
  });

  test('stateがない場合、エラーが返ること', () => {
    const value = {
      code: 'code',
    };

    expect(() => parse(getAuthCodeGrantDto, value)).toThrow();
  });

  test('errorがある場合、値が返ること', () => {
    const value = {
      code: 'code',
      state: 'state',
      error: 'error',
    };

    expect(parse(getAuthCodeGrantDto, value)).toEqual(value);
  });

  test('型が違う場合、エラーが返ること', () => {
    const value = {
      code: 1,
      state: 'state',
    };

    expect(() => parse(getAuthCodeGrantDto, value)).toThrow();
  });
});
