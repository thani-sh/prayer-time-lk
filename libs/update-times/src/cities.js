/**
 * List of Sri Lankan cities with ACJU prayer times data
 */
export const CITIES = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Dehiaththakandiya',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nallur',
  'Nuwaraeliya',
  'Padiyatalawa',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
].map((city) => ({
  id: city.toLowerCase(),
  name: city,
}))
;
