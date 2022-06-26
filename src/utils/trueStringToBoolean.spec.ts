import { trueStringToBoolean } from './trueStringToBoolean';

describe('trueStringToBoolean', () => {
  it('should convert "true" string to boolean', () => {
    expect(trueStringToBoolean({ value: 'true' })).toBe(true);
  });

  it('should return false for strings other than "true"', () => {
    expect(trueStringToBoolean({ value: 'totally-not-true' })).toBe(false);
  });
});
