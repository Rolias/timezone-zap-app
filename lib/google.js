'use strict';
const AUTH = require('../_local/google-api-credentials.js');

// function getAdjHour(timezoneObj, currentDate) {
//   const SECS_PER_HOUR = 3600;
//   var currentHour = currentDate.getHours();
//   var offsetHours = timezoneObj.totalOffset / SECS_PER_HOUR;
//   console.log(currentHour);
//   console.log(offsetHours);
//   var adjHour = currentHour + offsetHours;

//   if (adjHour < 0) {
//     adjHour = 24 + adjHour;
//   }
//   return adjHour;
// }

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

    var timezoneObj = JSON.parse(response.content);
    timezoneObj.totalOffset = timezoneObj.rawOffset + timezoneObj.dstOffset;
    // timezoneObj.localHour = getAdjHour(timezoneObj, currentDate);
    var localTimestamp = currentTime + (timezoneObj.totalOffset * MSECS_PER_SEC);
    timezoneObj.localTimestampMs = localTimestamp;
    timezoneObj.localDateTime = new Date(localTimestamp);
    console.log(timezoneObj);

    return timezoneObj;
  });
}

function getTimeZoneByName(z, timezoneName) {

  var dict = {
    ET: {
      lat: 40.7128,
      lon: -74.0059
    },
    CT: {
      lat: 41.8781,
      lon: -87.6298
    },
    MT: {
      lat: 40.7608,
      lon: -111.8910
    },
    PT: {
      lat: 33.8358,
      lon: -118.3406
    },
    HT: {
      lat: 20.7984,
      lon: -156.3319,
    },
    AT: {
      lat: 61.2181,
      lon: -149.9003
    },
    WET: {
      lat: 51.50741,
      lon: -0.1278,
    },
    MSK: {
      lat: 55.7558,
      lon: 37.473
    },
    EET: {
      lat: 60.1699,
      lon: 24.9384,
    },
    CET: {
      lat: 48.8566,
      lon: 2.3522
    }

  };

  if (timezoneName in dict) {

    var lat = dict[timezoneName].lat,
      lon = dict[timezoneName].lon;
    return getTimeZoneByLatLon(z, lat, lon);
  } else {
    return {
      status: 'ERROR: The selected time zone name does not exist.'
    };
  }
}

module.exports = {
  getTimeZoneByLatLon: getTimeZoneByLatLon,
  getTimeZoneByName: getTimeZoneByName
};