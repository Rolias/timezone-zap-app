//Create a couple of data structures that I need in more than one create
//here so that there is only one place to udpate if needed.

module.exports = {
    outputFields: [{
            key: 'dstOffset',
            label: 'Daylight Savings Time Offset In Seconds'
        },
        {
            key: 'rawOffset',
            label: 'Timezone offset in Seconds (does not include DST)'
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
    ],

    sample: {
        dstOffset: 3600,
        rawOffset: -28800,
        status: 'OK',
        timeZoneId: 'America/Los_Angeles',
        timeZoneName: 'Pacific Daylight Time',
        totalOffset: -25200,
        adjHoursOffset: 12,
        localTimestampMs: 1497695991304
    }
}