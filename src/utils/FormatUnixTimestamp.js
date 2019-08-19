// Format the UNIXDatetime object into more UI-friendly objects

const getUIFormattedDate = (unixTimeStamp, userLocation) => {
  // Create a new Date object to be formatted
  const newDate = new Date(unixTimeStamp);
  // Construct the UI-friendly, formatted date
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const month = months[newDate.getMonth()];
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  // Contruct the date string (US)
  const formattedDateUS = month + ' ' + day + ', ' + year;
  // Contruct the date string (Internation)
  const formattedDateInternational = day + ' ' + month + ', ' + year;
  // Return the UI-friendly, formatted date based on user's location
  return userLocation.country_code == 'US'
    ? formattedDateUS
    : formattedDateInternational;
};

const getUIFormattedTime = unixTimeStamp => {
  // Create a new Date object to be formatted
  const newDate = new Date(unixTimeStamp);
  // Construct the UI-friendly, formatted time
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const mins = minutes < 10 ? '0' + minutes : minutes;
  // Pick AM or PM for time
  const amOrPm = hour > 12 ? 'pm' : 'am';
  // Contruct the time string (US)
  const hours = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];
  const formattedTime = hours[hour - 1] + ':' + mins + ' ' + amOrPm + ',  ';
  // Return the UI-friendly, formatted time
  return formattedTime;
};

export default {
  getUIFormattedDate: getUIFormattedDate,
  getUIFormattedTime: getUIFormattedTime
};
