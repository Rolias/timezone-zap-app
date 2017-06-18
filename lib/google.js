'use strict';
const AUTH = require('../_local/google-api-credentials.js');


function getTimeZoneByLatLon(z, latitude, longitude) {
  const googleUrl = "https://maps.googleapis.com/maps/api/timezone/json?",
    location = "location=" + latitude + "," + longitude,
    currentDate = new Date(),
    MSECS_PER_SEC = 1000,
    currentTime = currentDate.getTime(),
    timeAsSecs = parseInt(currentTime / MSECS_PER_SEC),
    timestamp = "&timestamp=" + timeAsSecs,
    googleKey = "&key=" + AUTH.googleApiKey,
    googleCmd = googleUrl + location + timestamp + googleKey,
    promise = z.request(googleCmd, {});


  return promise.then((response) => {
    const SECS_PER_HOUR = 3600;
    var currentHour = currentDate.getHours(),
      timezoneObj = JSON.parse(response.content);
    timezoneObj.totalOffset = timezoneObj.rawOffset + timezoneObj.dstOffset;
    var offsetHours = timezoneObj.totalOffset / SECS_PER_HOUR;
    console.log(currentHour);
    console.log(offsetHours);
    var adjHour = currentHour + offsetHours;

    if (adjHour < 0) {
      adjHour = 24 + adjHour;
    }
    timezoneObj.adjHoursOffset = adjHour;
    var localTimestamp = currentTime + (timezoneObj.totalOffset * MSECS_PER_SEC);
    timezoneObj.localTimestampMs = localTimestamp;
    console.log("type is " + typeof timezoneObj.localTimestampMs);

    console.log(timezoneObj);

    // Special tests
    var testDate = new Date(localTimestamp);
    console.log("Hours: " + testDate.getHours() + " Minutes:" + testDate.getMinutes());

    return timezoneObj;
  });
}

function getTimeZoneByName(z, timezoneName) {
  var latitude,
    longitude;

  switch (timezoneName) {
    case 'ET':
      latitude = 40.7128;
      longitude = -74.0059;
      break;
    case 'CT':
      latitude = 41.8781;
      longitude = -87.6298;
      break;
    case 'MT':
      latitude = 40.7608;
      longitude = -111.8910;
      break;
    case 'PT':
      latitude = 33.8358;
      longitude = -118.3406;
      break;
    case 'HT':
      latitude = 20.7984;
      longitude = -156.3319;
      break;
    case 'PT':
      latitude = 61.2181;
      longitude = -149.9003;
      break;
  }
  return getTimeZoneByLatLon(z, latitude, longitude);


}

module.exports = {
  getTimeZoneByLatLon: getTimeZoneByLatLon,
  getTimeZoneByName: getTimeZoneByName
};