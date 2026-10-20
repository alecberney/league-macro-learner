import { expect, test } from 'bun:test';
import { DATA_PACKAGE } from '@lml/data';
import { ENGINE_PACKAGE } from '@lml/engine';

test('engine package resolves and links to data', () => {
  expect(ENGINE_PACKAGE).toBe('@lml/engine');
  expect(DATA_PACKAGE).toBe('@lml/data');
});
