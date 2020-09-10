export const ONBOARD_DEFAULT = {
    sectionTimePrefs: [],
    userTimezone: 'UTC-7:00'
}

var _ALL_TIMEZONES = [];
for (var i = 13; i >= 0; i--) {
    for (var minute of ["30", "00"]) {
        if (i === 0 && minute === "00") {
            continue;
        }
        _ALL_TIMEZONES.push("UTC-" + i + ":" + minute);
    }
}
for (var i = 0; i <= 13; i++) {
    for (var minute of ["00", "30"]) {
        _ALL_TIMEZONES.push("UTC+" + i + ":" + minute);
    }
}

export const ALL_TIMEZONES = _ALL_TIMEZONES;

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

export const addOffset = function(date, offset) {
    date.setHours(date.getHours() + offset.hours);
    date.setMinutes(date.getMinutes() + offset.minutes);
    return date;
}

export const shiftToTimezone = function(date, srcTzString, dstTzString) {
    removeOffset(date, parseUTCOffset(srcTzString));
    addOffset(date, parseUTCOffset(dstTzString));
    return date;
}