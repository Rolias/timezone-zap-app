'use strict';
const AUTH = require('../_local/google-api-credentials.js');
// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'timezone',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Timezone',
  display: {
    label: 'Timezone Latitude Longitude',
    description: 'Will get local timezone offsets using longitude and latitude'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'latitude', required: true, type: 'string', helpText:'Latitude of location for the timezone.'},
      {key: 'longitude', required: true, type: 'string', helpText: 'Longitude of the location for the timezone.'},
    ],

    perform: (z, bundle) => {
      const googleUrl = "https://maps.googleapis.com/maps/api/timezone/json?", 
            location = "location="+bundle.inputData.latitude+","+bundle.inputData.longitude,
            currentDate = new Date(),
            MSECS_PER_SEC = 1000,
            currentTime = currentDate.getTime(),
            timeAsSecs = parseInt(currentTime/MSECS_PER_SEC),
            timestamp= "&timestamp="+timeAsSecs,
            googleKey = "&key="+AUTH.googleApiKey,  
            googleCmd = googleUrl+location+timestamp+googleKey,
            promise = z.request(googleCmd, {
            });
            //console.log ("GoogleCmd is:"+googleCmd);
           //this.util();

      return promise.then((response) => {
        const SECS_PER_HOUR = 3600;
        var currentHour = currentDate.getHours(),
            timezoneObj =  JSON.parse(response.content);
        timezoneObj.totalOffset = timezoneObj.rawOffset + timezoneObj.dstOffset;
        var offsetHours = timezoneObj.totalOffset/SECS_PER_HOUR;
        console.log(currentHour);
        console.log(offsetHours);
        var adjHour = currentHour + offsetHours;
        
        if (adjHour < 0){
          adjHour= 24+adjHour;
        }
        timezoneObj.adjHoursOffset = adjHour;
        var localTimestamp = currentTime +(timezoneObj.totalOffset * MSECS_PER_SEC);
        timezoneObj.localTimestampMs = localTimestamp;
        console.log ("type is "+ typeof timezoneObj.localTimestampMs);

        console.log(timezoneObj);

        // Special tests
        var testDate = new Date(localTimestamp);
        console.log("Hours: "+ testDate.getHours()+ " Minutes:"+ testDate.getMinutes());

        return timezoneObj;
      });  
  },
    
    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      dstOffset: 3600,
      rawOffset: -28800,
      status: 'OK',
      timeZoneId: 'America/Los_Angeles',
      timeZoneName: 'Pacific Daylight Time',
      totalOffset: -25200,
      adjHoursOffset: 12,
      localTimestampMs: 1497695991304
    },
    
    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'dstOffset', label: 'Daylight Savings Time Offset In Seconds'},
      {key: 'rawOffset', label: 'Timezone offset in Seconds (does not include DST'},
      {key: 'status', label: 'Status'},
      {key: 'timeZoneId', label: 'Location name'},
      {key: 'timeZoneName', label: 'Timezone name (e.g. Pacific Daylight Time'},
      {key: 'totalOffset', label: 'Timezone raw and dst combined'},
      {key: 'adjHoursOffset', label:'Hours Value in local timezone'},
      {key: 'localTimestampMs', label:'Local Time in MS'}
    ]
  }
};
