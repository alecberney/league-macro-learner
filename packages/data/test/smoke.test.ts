import { expect, test } from 'bun:test';
import { DATA_PACKAGE } from '@lml/data';

test('data package resolves', () => {
  expect(DATA_PACKAGE).toBe('@lml/data');
});
