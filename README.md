# An Action App for use inside Zapier

This node project creates a zapier app. I wanted a way to reuse small amounts of JavaScript that I've written in multiple zaps and writing a Zapier "App" let's me do that. This README is mostly about how to create a Zapier App but at the bottom I'll have some info on how to use this specific tool. This particular App has no triggers it only has what Zapier calls "Creates". That is pretty much the same as actions. Zapier has a CLI tool that makes doing this pretty straightforward. There is a [pretty easy to follow tutorial](https://github.com/zapier/zapier-platform-cli/wiki/Tutorial). I actually started from the [Getting Started Page](https://github.com/zapier/zapier-platform-cli#getting-started). The basic steps are

1. `npm install -g zapier-platform-cli` //Get the Zapier CLI tool (there's a web gui tool but I haven't used it yet)
1. `zapier login`

The Zapier tooling does want a specific version of node so you will need to install nvm [as instructed](https://github.com/creationix/nvm#installation).
Once that is all set up you can execute:  
`nvm use 6.10.2`  
 and the Zapier tools will be happy. I created this project by starting with  
`zapier init . --template=create`  
_Don't miss that period, the init command requires a path so I'm assuming you're in the directory where you want to create the project._
Then I modified the creates/recipe.js file and renamed it and made it do my bidding. You need to satisfy all the Node packages by issuing:
`npm install`
You can test with:  
`zapier test`  
and upload your code to Zapier with  
`zapier push`

There is a [page of examples](https://github.com/zapier/zapier-platform-cli/wiki/Example-Apps)  and under each link for each example is the relevant `--template` value to use. Zapier provides two objects where most of the magic happens, the [`Z Object`](https://github.com/zapier/zapier-platform-cli#z-object) and the [`Bundle Object`](https://github.com/zapier/zapier-platform-cli#bundle-object).

## Using This project in Zapier

If you want to use this Zap as is, just ask me and I can share it with you via Zapier's invite system (requires your email). Currently my Google API key is in the deployed App but it's not in this repo. If you want to to clone and reuse this repo for your version of a timezone app, you'll want to add a folder name `_local` at the root of the node project. Then create a file `google-api-credentials.js`. That file will contain something like this where you subsitute your actual API key in the obvious place.

```javascript
module.exports = {
    googleApiKey:'<YOUR API KEY GOES HERE>'
};
```

This particular project just uses the Google TimeZone api to get the raw and dst (daylight savings time) offset from either the provided latitude and longitude or a handlful of timezones. Since the tool adjusts for DST the timezones for the US just use the two letter abbrevation (e.g. PT = Pacific Time, also I made up (maybe) AK = Alaska Time and HT= Hawaii Time).

In creates/timezone.js all the code invoked by Zapier is in the `perform` object. Since I wanted to do the same basic API call from two different actions I moved the common code out into the `lib` folder in the file `google.js`. The App returnst the following:

1. The timezone object from the Google API
1. A field named `totalOffset` that just adds the raw and dst offsets
1. A field named `localDateTime` a Javascript new Date() in the local timezone.

**IMPORTANT WARNING** Note when you use the results from an APP in Zapier the values are strings. You need to translate those back into the native JavaScript types. So while localDateTime is nice for debugging and making sure the date and time in the local zone are correct, you can create a native JS date object in your Zap with code that will look similar to this:

```javascript
const today = new Date(parseInt(inputData.localTime));
```

_Note that you have to use `parseInt()` to use the localTime string as an int. Also the names you see in your Zap for the above fields are defined in the `outputFields` array located in lib/commonTimeZoneData.js. Both the outputFields and sampleData structures are used in both creates so I extracted them to a common location._

 The whole need for this APP is because when you write `Code By Zapier` steps using JavaScript the code appears to think it's in UTC 0 and doesn't use the user profile time zone setting the way other Actions do.

A possible improvement would be to figure out how to use the user settings to figure out where the user is and then if the lat and lon aren't supplied just use that information to figure the local timezone.

The `test/timezone.js` contains the unit tests. The build process is to use `zapier test` to make sure any changes work. Then `zapier push` to push the App to Zapier. After the push the new App is then available (to the developer) when creating Zaps. It's a good idea to do a page refresh in Zapier otherwise it's possible to load an old version of the App. You can also update version information in the package.json file. To date I haven't figured out how to remove old versions from the Zapier editor so my advice for now is just stick with a single version number until you publish and make your App publicly available. The docs have more information on managing versions and doing fancier authentication so you don't have to use your API keys for everything as well as for sharing and publishing apps.

There are a lot more zapier commands and a lot of documentation I haven't read yet. But this was enough to get a working App up into Zap and allow me a way to reuse JavaScript code and therefore greatly simlify my `Code by Zapier` code.