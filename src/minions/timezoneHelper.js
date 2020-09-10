
const parseUTCOffset = function(tzString) {
	var parsedString = tzString.slice(3);
	var multiplier = (parsedString[0] === "+") ? 1 : -1;
	parsedString = parsedString.slice(1);
	var [hours, minutes] = parsedString.split(":");
	return {
	  "hours": multiplier * parseInt(hours),
	  "minutes": multiplier * parseInt(minutes)
	}
}

const removeOffset = function(date, offset) {
    date.setHours(date.getHours() - offset.hours);
    date.setMinutes(date.getMinutes() - offset.minutes);
    return date;
}

const addOffset = function(date, offset) {
    date.setHours(date.getHours() + offset.hours);
    date.setMinutes(date.getMinutes() + offset.minutes);
    return date;
}

export const shiftToTimezone = function(date, srcTzString, dstTzString) {
    removeOffset(date, parseUTCOffset(srcTzString));
    addOffset(date, parseUTCOffset(dstTzString));
    return date;
}

export const getLocalTime = function(timeZoneStr, dateTime) {

	// all times in this program should be CA time, UTC-7.
	return shiftToTimezone(dateTime, 'UTC-7:00', timeZoneStr)

}