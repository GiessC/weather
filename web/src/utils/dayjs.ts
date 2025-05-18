import type { Dayjs } from 'dayjs';

export function formatWithTime(date: Dayjs | undefined | null) {
  if (!date) {
    return '';
  }

  return date.format('YYYY-MM-DD HH:mm:ss');
}
