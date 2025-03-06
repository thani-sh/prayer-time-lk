export default {
  shafi: {
    colombo: () => import('./shafi.colombo.js').then((m) => m.default),
    others: () => import('./shafi.others.js').then((m) => m.default),
  } as const,
  hanafi: {
    colombo: () => import('./hanafi.colombo.js').then((m) => m.default),
    others: () => import('./hanafi.others.js').then((m) => m.default),
  } as const,
} as const;
