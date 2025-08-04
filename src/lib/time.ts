export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const readableDuration = (milliseconds: number) => {
	if (milliseconds < MINUTE) {
		return 'less than a minute';
	}
	if (milliseconds < HOUR) {
		return Math.round(milliseconds / MINUTE) + ' minutes';
	}
	if (milliseconds < DAY) {
		return Math.round(milliseconds / HOUR) + ' hours';
	}
	return Math.round(milliseconds / DAY) + ' days';
};

/**
 * Check if the current time is within the specified hour range.
 * 
 * Args:
 *     startHour: Start hour (0-23, 24-hour format)
 *     endHour: End hour (0-23, 24-hour format)
 * 
 * Returns:
 *     boolean: True if current time is within the range
 */
export const isCurrentTimeInRange = (startHour: number, endHour: number): boolean => {
	const now = new Date();
	const currentHour = now.getHours();
	
	// Handle case where start and end are the same (no blocking)
	if (startHour === endHour) {
		return false;
	}
	
	// Handle normal case where start < end (e.g., 5 AM to 6 PM)
	if (startHour < endHour) {
		return currentHour >= startHour && currentHour < endHour;
	}
	
	// Handle overnight case where start > end (e.g., 10 PM to 6 AM)
	return currentHour >= startHour || currentHour < endHour;
};
