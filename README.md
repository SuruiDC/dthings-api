<p>
<a href="https://bots.discordthings.com"><img src="https://cdn.discordapp.com/attachments/814920811190288477/846196959786172487/dthingsblob_4K.png" width="256" height="256"/></a>
</p>

# Dthings-scraper
Get information and search for bots from discordthings.com

Example:
```js
const dApi = require("dthings-scraper")

//getInfoBot function example:

dApi.getInfoBot("720509373020897331").then(console.log)// This is id of Elaina Bot
/*
return: 

{
  name: 'Elaina',
  id: '720509373020897331',
  certificate: true,
  botbug: false,
  description: 'Elaina es un bot de utilidad y música',
  prefix: 'e!',
  servers: 'N/A',
  votes: '25',
  invites: '98',
  tags: [ 'Music', 'Utility' ],
  page: [],
  owners: [ 'Surui#0031' ]
}

*/

//searchBot function example:

dApi.searchBot("elaina").then(console.log)

/*
return: 

{
  name: 'Elaina',
  id: '720509373020897331',
  certificate: true,
  botbug: false,
  description: 'Elaina es un bot de utilidad y música',
  prefix: 'e!',
  servers: 'N/A',
  votes: '25',
  invites: '98',
  tags: [ 'Music', 'Utility' ],
  page: [],
  owners: [ 'Surui#0031' ]
}

*/

```
