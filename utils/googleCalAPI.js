import { GOOGLE_CAL_API_KEY_COLORADO } from 'react-native-dotenv'

const convertDateForURLParam = (date) => {
    var yyyy = date.getFullYear().toString(),
      mm = (date.getMonth() + 1).toString(),
      dd = date.getDate().toString(),
      mmChars = mm.split(''),
      ddChars = dd.split('')
  
    return (
      yyyy +
      '-' +
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '-' +
      (ddChars[1] ? dd : '0' + ddChars[0])
    )
},
pad = (value) => {
    return value < 10 ? '0' + value : value;
},
createOffset = (date) => {
    var sign = (date.getTimezoneOffset() > 0) ? "-" : "+";
    var offset = Math.abs(date.getTimezoneOffset());
    var hours = pad(Math.floor(offset / 60));
    var minutes = pad(offset % 60);
    return sign + hours + ":" + minutes;
},
addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
},
now = new Date(),
later = addDays(now, 4),
offset = createOffset(now),
time = `00:00:00${offset}`,
today = convertDateForURLParam(now) + 'T' + time

const apiString = 'https://www.googleapis.com/calendar/v3/calendars/',
  apiKeyParam = `?key=${GOOGLE_CAL_API_KEY_COLORADO}`,
  getEvents = '/events',
  singleEvents = '&singleEvents=true',
  orderBy = '&orderBy=startTime',
  timeMin = '&timeMin='.concat(today),
  laterFromToday = convertDateForURLParam(later) + 'T' + time,
  timeMax = '&timeMax='.concat(laterFromToday)

const classesURI = `${apiString}${'media@meditationincolorado.org'}${getEvents}${apiKeyParam}${singleEvents}${orderBy}${timeMin}${timeMax}`

module.exports = {
    getClasses: async (awsCredsResponse) => {
        console.log('getClass:', awsCredsResponse, classesURI)
        return fetch(classesURI)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.items
            })
            .catch((error) => {
                return { 'error': 'no classes returned'}
            });
    },
    // getClasses: async (state) => {
    //     // const key = `google-calendar-api/${country}/${region}/${city}/token.json`
    //     const url = 'https://nkt-mobile-api.herokuapp.com/calendar'

    //     return fetch(url)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log('getClasses: ', responseJson)
    //             return responseJson
    //         })
    //         .catch((error) => {
    //             return { 'error': 'no classes returned'}
    //         });
    // }
}