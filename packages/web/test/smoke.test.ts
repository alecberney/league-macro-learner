import { expect, test } from 'bun:test';
import { WEB_PACKAGE } from '../src/index';

test('web package resolves', () => {
  expect(WEB_PACKAGE).toBe('@lml/web');
});
