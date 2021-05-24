<p>
<a href="https://bots.discordthings.com"><img src="https://cdn.discordapp.com/attachments/814920811190288477/846196959786172487/dthingsblob_4K.png" width="256" height="256"/></a>
</p>

# Dthings-api
Get information and search for bots from discordthings.com

Example:
```js
const dApi = require("dthings-api")

//getInfoBot function example:

dApi.getInfoBot("720509373020897331").then(console.log)// This is id of Elaina Bot

//searchBot function example:

dApi.searchBot("elaina").then(console.log)

```
