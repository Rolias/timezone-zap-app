# An Action App for use inside Zapier
This node project creates a zapier app. I wanted a way to reuse small amounts of JavaScript that I've written in multiple zaps and writing a Zapier "App" let's me do that. This particular one has no triggers it only has what Zapier calls "Creates". That is pretty much the same as actions. Zapier has a CLI tool that makes doing this pretty straightforward. There is a [pretty easy to follow tutorial](https://github.com/zapier/zapier-platform-cli/wiki/Tutorial). I actually started from the [Getting Started Page](https://github.com/zapier/zapier-platform-cli#getting-started). The Zapier tooling does want a specific version of node so you will need to install nvm [as instructed](https://github.com/creationix/nvm#installation)
Once it was all set up then I could just issue
`nvm use 6.10.2 ` and the Zapier tools were happy. 
I created this project by starting with
`zapier init . --template=create`
Then I modified the creates/recipe.js file and renamed it and made it do my bidding. 

## This project
This particular project just uses the Google TimeZone api to get the raw and dst offset from the provided latitude and longitude. A nice improvement would be to support either timezone names or locations but this is pretty instructive as is. Also the end user of the Action only needs to every look this up once. 

In creates/timezone.js all the code is in the `perform` object. The only additional thing it does is gets the current time and calculates an adjusted Hour so there is a convenient way to know the current hour in your local time zone. The whole need for this is because when you write `Code By Zapier` steps using JavaScript the code appears to think it's in UTC 0 and doesn't use the user profile time zone setting the way other Actions do. 

A possible improvement would be to figure out how to use the user settings to figure out where the user is and then if the lat and lon aren't supplied just use that information to figure the local timezone. 

The `test/timezone.js` contains the unit test. The build process is to use `zapier test` to make sure any changes work. Then `zapier push` to push the App to Zapier. It is then available when creating Zaps. It's a good idea to do a page refresh in Zapier otherwise it's possible to load an old version of the App. You can also update version information in the package.json file. 

There's a lot more zapier commands and a lot of documentation I haven't read yet. But this was enough to get a working App up into Zap and allow me a way to reuse JavaScript code and therefore greatly simlify my `Code by Zapier` code. 
