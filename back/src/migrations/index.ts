import * as migration_20260525_080007 from './20260525_080007';

export const migrations = [
  {
    up: migration_20260525_080007.up,
    down: migration_20260525_080007.down,
    name: '20260525_080007'
  },
];
