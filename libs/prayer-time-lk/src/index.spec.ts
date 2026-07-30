import { expect, test } from 'vitest';
import { getPrayerTimes } from './index';

/**
 * Tests for the getPrayerTimes function
 */
test('getPrayerTimes - acju - colombo - 2024-01-01', async () => {
  const result = await getPrayerTimes(new Date('2024-01-01'), 'acju', 'colombo');
  expect(result).toEqual({
    fajr: { hour: 5, minute: 0 },
    sunrise: { hour: 6, minute: 22 },
    dhuhr: { hour: 12, minute: 15 },
    asr: { hour: 15, minute: 37 },
    maghrib: { hour: 18, minute: 7 },
    isha: { hour: 19, minute: 21 },
  });
});

test('getPrayerTimes - acju - ampara - 2024-01-01', async () => {
  const result = await getPrayerTimes(new Date('2024-01-01'), 'acju', 'ampara');
  expect(result).toEqual({
    fajr: { hour: 4, minute: 53 },
    sunrise: { hour: 6, minute: 16 },
    dhuhr: { hour: 12, minute: 8 },
    asr: { hour: 15, minute: 29 },
    maghrib: { hour: 17, minute: 58 },
    isha: { hour: 19, minute: 13 },
  });
});
