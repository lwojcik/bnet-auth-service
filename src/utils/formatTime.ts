import { Duration } from 'luxon';

export const formatTime = (seconds: number) =>
  Duration.fromObject({ seconds }).toISOTime();
