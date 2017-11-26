const request = require('request');
const yargs = require('yargs');

const argv = yargs
.options({
  d: {
    demand: true,
    alias: 'date',
    describe: "Date of the library to fetch the hours.",
    string: true
  }
})
.help()
.alias('help', 'h')
.argv

var startDate = argv.d;
var endDate = updateDate(startDate);

function updateDate(date) {
  var splitDate = date.split('-');
  splitDate[2] = String(Number(splitDate[2]) + 1);
  return splitDate.join('-');
}

request({
  url: `https://clients6.google.com/calendar/v3/calendars/caldwellcollegelibrary@gmail.com/events?calendarId=caldwellcollegelibrary@gmail.com&singleEvents=true&timeZone=America/New_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${startDate}T00:00:00-05:00&timeMax=${endDate}T00:00:00-05:00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`,
  json: true
},(error, response, body) => {
  if(!error && response.statusCode == 200 ) {
    var libHours = body.items[0].summary;
    console.log(`The library hour for the date ${argv.d} is ${libHours}.`);
  } else {
    console.log("Sorry! Could not fetch the hours.");
  }

})
