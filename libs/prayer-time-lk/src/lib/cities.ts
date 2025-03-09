/**
 * List of cities supported by the library.
 */
export const CITIES = ['colombo', 'others'] as const;

/**
 * Default city to use if none is provided.
 */
export const DEFAULT_CITY: City = 'colombo';

/**
 * Type for cities supported by the library.
 */
export type City = (typeof CITIES)[number];

/**
 * Check if the given value is a valid city.
 */
export function isValidCity(city: any): city is City {
  return CITIES.includes(city);
}
