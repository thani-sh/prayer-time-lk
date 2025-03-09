import { expect, test } from 'vitest';
import { getPrayerTimes } from './index';

/**
 * Tests for the getPrayerTimes function
 */
test('getPrayerTimes - shafi', async () => {
  const result = await getPrayerTimes(new Date('2023-09-17'), 'shafi', 'colombo');
  expect(result).toEqual({
    asr: { hour: 15, minute: 14 },
    dhuhr: { hour: 12, minute: 7 },
    fajr: { hour: 4, minute: 45 },
    isha: { hour: 19, minute: 21 },
    maghrib: { hour: 18, minute: 12 },
    sunrise: { hour: 6, minute: 1 },
  });
});

test('getPrayerTimes - hanafi', async () => {
  const result = await getPrayerTimes(new Date('2023-09-17'), 'hanafi', 'colombo');
  expect(result).toEqual({
    asr: { hour: 16, minute: 24 },
    dhuhr: { hour: 12, minute: 7 },
    fajr: { hour: 4, minute: 45 },
    isha: { hour: 19, minute: 21 },
    maghrib: { hour: 18, minute: 12 },
    sunrise: { hour: 6, minute: 1 },
  });
});
