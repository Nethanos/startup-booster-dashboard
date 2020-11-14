/**
 * This code was originally implemented by @fargolas in pure JS https://gist.github.com/flangofas/714f401b63a1c3d84aaa
 *
 * This is a typescript adapted to project version.
 */

export interface DateConverted {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function convertMiliseconds(
  miliseconds: number,
  format?: string
): number | DateConverted {
  let dateConverted = {} as DateConverted;

  const totalSeconds = Math.floor(miliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  dateConverted.days = Math.floor(totalHours / 24);

  dateConverted.seconds = totalSeconds % 60;
  dateConverted.minutes = totalMinutes % 60;
  dateConverted.hours = totalHours % 24;

  switch (format) {
    case "s":
      return totalSeconds;
    case "m":
      return totalMinutes;
    case "h":
      return totalHours;
    case "d":
      return dateConverted.days;
    default:
      return dateConverted;
  }
}

export function getExactDate(date: Date) {
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
