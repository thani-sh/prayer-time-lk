import colombo from "./times/colombo.js";

/**
 * Returns a Time object with hour and minute.
 * @param {number} hour
 * @param {number} minute
 * @returns {Time}
 */
function createTime(hour, minute) {
  return { hour, minute };
}

/**
 * Reutrns prayer times for a given month and day
 * @param {number} month
 * @param {number} day
 * @returns {PrayerTimes}
 */
export function forMonthAndDay(month, day) {
  const times = colombo.find((t) => t.m === month && t.d === day).t;
  return {
    fajr: createTime(times[0][0], times[0][1]),
    sunrise: createTime(times[1][0], times[1][1]),
    dhuhr: createTime(times[2][0], times[2][1]),
    asr: createTime(times[3][0], times[3][1]),
    asr_hanafi: createTime(times[4][0], times[4][1]),
    maghrib: createTime(times[5][0], times[5][1]),
    isha: createTime(times[6][0], times[6][1]),
  };
}

/**
 * Reutrns prayer times for a given date
 * @param {Date} date
 * @returns {PrayerTimes}
 */
export function forDate(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return forMonthAndDay(m, d);
}

/**
 * Returns prayer times for today
 * @returns {PrayerTimes}
 */
export function forToday() {
  return forDate(new Date());
}
