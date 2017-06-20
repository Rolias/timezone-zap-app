'use strict';
const google = require('../lib/google'),
  common = require('../lib/commonTimeZoneData');

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'timezoneName',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'TimezoneName',
  display: {
    label: 'Timezone Using Limited Set of Zone Names',
    description: 'Will get local timezone offsets based on the passed Time Zone name.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [{
      key: 'zoneName',

      choices: {
        AT: 'Alaska Time',
        ET: 'Eastern Time',
        EET: 'Eastern European Time',
        CET: 'Central European Time',
        CT: 'Central Time',
        HT: 'Hawaii Time',
        MSK: 'Moscow Time',
        MT: 'Mountain Time',
        PT: 'Pacific Time',
        WET: 'Western European Time',
      },
      required: true,
      type: 'string',
      helpText: 'A limited set of short time zone names. In the US PT, ET, CT, MT, AT (Alsaksa), HT (Hawaii), and a few Euro zones EET, CET, WET, MSK'
    }],

    perform: (z, bundle) => {
      return google.getTimeZoneByName(z, bundle.inputData.zoneName);
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