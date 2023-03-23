import { format } from "date-fns";

/**
 * A helper class for working with dates in W3C format.
 */
export class dateHelper {
  /**
   * Returns a string representing a date in W3C format.
   * We must initialize the dates with the timezone offset to avoid javascript auto-correcting timezone.
    * For example, with GMT-03:00, if we set the date to '2022-11-08',
    * javascript will convert it to '2022-11-07T21:00:00.000Z'
    * Output examples:
    * Sao Paulo/Brazil: 2022-12-13T00:00:00.000-03:00
    * London/England:   2022-12-13T00:00:00.000+00:00
    * Berlin/Germany:   2022-12-13T00:00:00.000+01:00
   */
  static getW3CTime(date: string): string {
    const currentDate = new Date();
		// Offset examples (In minutes): 
		// São Paulo: 180, London: 0, Berlin: -60
		const offsetMinutes = currentDate.getTimezoneOffset();
        
    // Calculate offset hours and sign
    const offsetHours = Math.abs(offsetMinutes / 60);
    const signal = offsetMinutes <= 0 ? '+' : '-';

    // Format offset as two-digit string
    const offsetString = offsetHours.toString().padStart(2, '0');
    
    return `${date}T00:00:00.000${signal}${offsetString}:00`;
  }
  
  /**
   * Returns a new Date object representing the date in W3C format.
   */
  static newDate(date: string): Date {
    return new Date(this.getW3CTime(date));
  }
  
  /**
   * Returns a formatted string representing the given date.
   */
  static format(date: string): string {
    return format(this.newDate(date), 'MMM d, yyyy');
  }
}
