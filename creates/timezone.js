'use strict';
const google = require('../lib/google'),
  common = require('../lib/commonTimeZoneData');
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
    inputFields: [{
        key: 'latitude',
        required: true,
        type: 'string',
        helpText: 'Latitude of location for the timezone.'
      },
      {
        key: 'longitude',
        required: true,
        type: 'string',
        helpText: 'Longitude of the location for the timezone.'
      },
    ],

    perform: (z, bundle) => {
      return google.getTimeZoneByLatLon(z, bundle.inputData.latitude, bundle.inputData.longitude);
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: common.sample,


    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: common.outputFields,
  }
};