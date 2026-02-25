import dayjs from 'dayjs';

export class DateUtil {
    /**
     * Get current date in specified format
     * @param format - Format string (default: YYYY-MM-DD)
     */
    static getCurrentDate(format: string = 'YYYY-MM-DD'): string {
        return dayjs().format(format);
    }

    /**
     * Get future date
     * @param days - Number of days to add
     * @param format - Format string (default: YYYY-MM-DD)
     */
    static getFutureDate(days: number, format: string = 'YYYY-MM-DD'): string {
        return dayjs().add(days, 'day').format(format);
    }

    /**
     * Get past date
     * @param days - Number of days to subtract
     * @param format - Format string (default: YYYY-MM-DD)
     */
    static getPastDate(days: number, format: string = 'YYYY-MM-DD'): string {
        return dayjs().subtract(days, 'day').format(format);
    }

    /**
     * Format a given date
     * @param date - Date to format
     * @param format - Format string (default: YYYY-MM-DD)
     */
    static formatDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
        return dayjs(date).format(format);
    }
}
