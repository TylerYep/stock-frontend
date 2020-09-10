import {getLocalTime} from './timezoneHelper.js'

export const getDisplayName = function(user, userData) {
  // first option: the name they put in the form
  if(userData && 'about' in userData) {
    if(userData['about'] && userData['about']['name']) {
      return userData['about']['name']
    }
  }

  // otherwise the name associated with their email
  if ('displayName' in user && user['displayName']) {
    return user['displayName']
  }

  // if all else fails
  return user.email
}

export const checkVisualImparement = function(aboutDataFilled, aboutData) {
  if(!aboutDataFilled) {
    return false
  }

  if(!aboutData['about']) {
    return false
  }

  if(!aboutData['about']['disabilities']) {
    return false
  }
  return aboutData['about']['disabilities'].includes('blind');

}

const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export const getSectionIndex = function(userData) {
  return userData['slSectionTime']['sectionTime']
}

export const getStudentSectionIndex = function(userData) {
  return parseInt(userData['studentSectionTime'])
}

const getTimezone = function(userData) {
  return userData['userTimezone']
}

export const getTimezoneStr = function(userData) {
  let tz = getTimezone(userData)
  if(tz.endsWith('00')) {
    return tz.substring(0, tz.length - 3);
  } else {
    return tz
  }
}




export const getSectionDateTimeStr = function(userData, week) {
  let sectionIndex = getSectionIndex(userData)
  let userTimeZone = getTimezone(userData)

  let dateTime = new Date(2020,3,15 + 7 * week,16+ sectionIndex,0); // sections start at 4pm on Wednesday


  let shiftedTime = getLocalTime(getTimezone(userData),dateTime)


  let x = dateTime.toLocaleString('default', { month: 'short' })
  x += ' ' + dateTime.getDate() + nth(dateTime.getDate())
  x += ', ' + getSectionTimeStr(userData)
  return x
}

export const getStudentSectionDayTimeStr = function(userData){
  let sectionIndex = getStudentSectionIndex(userData)

  let dateTime = new Date(2020,3,15,16+sectionIndex,0); // sections start at 4pm on
  let shiftedTime = getLocalTime(getTimezone(userData),dateTime)

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  let dayName = days[shiftedTime.getDay()]
  return dayName + ', ' + getStudentSectionTimeStr(userData)
}

export const getSectionDayTimeStr = function(userData) {
  let sectionIndex = getSectionIndex(userData)

  let dateTime = new Date(2020,3,15,16+sectionIndex,0); // sections start at 4pm on
  let shiftedTime = getLocalTime(getTimezone(userData),dateTime)

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  let dayName = days[shiftedTime.getDay()]
  return dayName + ', ' + getSectionTimeStr(userData)
}

export const getSectionTimeStr = function(userData) {
  let sectionIndex = getSectionIndex(userData)

  let dateTime = new Date(2020,3,15,16+sectionIndex,0); // sections start at 4pm on Wednesday

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  let shiftedTime = getLocalTime(getTimezone(userData),dateTime)

  let dayName = days[shiftedTime.getDay()]
  let hours = shiftedTime.getHours()
  let mins = shiftedTime.getMinutes()

  return getFormattedSection(dayName, hours, mins)
}

export const getStudentSectionTimeStr = function(userData) {
  let sectionIndex = getStudentSectionIndex(userData)

  let dateTime = new Date(2020,3,15,16+sectionIndex,0); // sections start at 4pm on Wednesday

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  let shiftedTime = getLocalTime(getTimezone(userData),dateTime)

  let dayName = days[shiftedTime.getDay()]
  let hours = shiftedTime.getHours()
  let mins = shiftedTime.getMinutes()

  return getFormattedSection(dayName, hours, mins)
}

const getFormattedSection = function(dayName, hours, mins) {
    if(mins == 0) {
      // special case for midnight
      if(hours == 0) {
        return 'Midnight'
      }
      if(hours == 12) {
        return 'Noon'
      }
      // special case for noon
      var suffix = 'am'
      if(hours >12) {
        suffix = 'pm'
        hours -= 12
      }
      return hours + suffix
    }
    if(mins == 30) {
      // special case for noon
      var suffix = 'am'
      if(hours == 0) {
        return '12:30am (after Midnight)'
      } else if(hours == 12) {
        return '12:30pm (after Noon)'
      } else if(hours >=12) {
        suffix = 'pm'
        hours -= 12
      }
      return hours+':30' + suffix
    }
  }