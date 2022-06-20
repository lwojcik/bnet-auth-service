import { Duration } from 'luxon';

export const formatTime = (seconds) =>
  Duration.fromObject({ seconds }).toISOTime();
