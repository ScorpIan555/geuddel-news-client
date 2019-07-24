// Format the UNIXDatetime object into more UI-friendly objects

const getUIFormattedDate = (unixTimeStamp, userLocation) => {
  // Create a new Date object to be formatted
  let newDate = new Date(unixTimeStamp)
  // Construct the UI-friendly, formatted date
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let month = months[newDate.getMonth()]
  let day = newDate.getDate()
  let year = newDate.getFullYear()
  // Contruct the date string (US)
  let formattedDateUS = month + ' ' + day + ', ' + year
  // Contruct the date string (Internation)
  let formattedDateInternational = day + ' ' + month + ', ' + year
    // Return the UI-friendly, formatted date based on user's location
    return userLocation.country_code == 'US' ? formattedDateUS :  formattedDateInternational
}

const getUIFormattedTime = (unixTimeStamp) => {
  // Create a new Date object to be formatted
  let newDate = new Date(unixTimeStamp)
  // Construct the UI-friendly, formatted time
  let hour = newDate.getHours()
  let minutes = newDate.getMinutes()
  let mins = minutes < 10 ? '0' + minutes : minutes
  // Pick AM or PM for time
  let amOrPm = hour > 12 ? 'pm' : 'am'
  // Contruct the time string (US)
  let hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const formattedTime = hours[hour - 1] + ':' + mins + ' ' + amOrPm + ',  '
    // Return the UI-friendly, formatted time
    return formattedTime
}

export default {
  getUIFormattedDate: getUIFormattedDate,
  getUIFormattedTime: getUIFormattedTime
}
