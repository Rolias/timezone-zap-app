'use strict';
const AUTH = require('../_local/google-api-credentials.js');
var Google = require('../lib/google.js');
// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'timezoneName',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'TimezoneName',
  display: {
    label: 'Timezone Using US Zone Name',
    description: 'Will get local timezone offsets based on Time Zone name.'
  },

  util: function () {
    console.log("OK");
  },
  // `operation` is where the business logic goes.
  operation: {
    inputFields: [{
      key: 'zoneName',
      required: true,
      type: 'string',
      helpText: 'US Name for Zone PT, ET, CT, MT, AT, HT'
    }, ],

    perform: (z, bundle) => {
      return Google.getTimeZoneByName(z, bundle.inputData.zoneName);
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
    outputFields: [{
        key: 'dstOffset',
        label: 'Daylight Savings Time Offset In Seconds'
      },
      {
        key: 'rawOffset',
        label: 'Timezone offset in Seconds (does not include DST'
      },
      {
        key: 'status',
        label: 'Status'
      },
      {
        key: 'timeZoneId',
        label: 'Location name'
      },
      {
        key: 'timeZoneName',
        label: 'Timezone name (e.g. Pacific Daylight Time'
      },
      {
        key: 'totalOffset',
        label: 'Timezone raw and dst combined'
      },
      {
        key: 'adjHoursOffset',
        label: 'Hours Value in local timezone'
      },
      {
        key: 'localTimestampMs',
        label: 'Local Time in MS'
      }
    ]
  }
};