/**
 * This code was originally implemented by @fargolas in pure JS https://gist.github.com/flangofas/714f401b63a1c3d84aaa
 * 
 * This is a typescript adapted to project version.
 */

export interface DateConverted {
    days: number,
    hours: number,
    minutes: number,
    seconds: number;
}

export default function convertMiliseconds(miliseconds: number, format?: string): number | DateConverted  {
    let dateConverted = {} as DateConverted;
    
    const total_seconds = Math.floor(miliseconds / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_hours = Math.floor(total_minutes / 60);
    dateConverted.days = Math.floor(total_hours / 24);
  
    dateConverted.seconds = total_seconds % 60;
    dateConverted.minutes = total_minutes % 60;
    dateConverted.hours = total_hours % 24;
    
    switch(format) {
      case 's':
          return total_seconds;
      case 'm':
          return total_minutes;
      case 'h':
          return total_hours;
      case 'd':
          return dateConverted.days;
      default:
          return dateConverted;
    }
  };