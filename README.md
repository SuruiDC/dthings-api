<p>
<a href="https://bots.discordthings.com"><img src="https://cdn.discordapp.com/attachments/814920811190288477/846196959786172487/dthingsblob_4K.png" width="256" height="256"/></a>
</p>

# Dthings-api
Get information users and bots from discordthings.com

Example:
```js
const dApi = require("dthings-api")

//getInfoBot function example:

dApi.getInfoBot("720509373020897331").then(console.log)// This is id of Elaina Bot

/*
return: 

{
  name: 'Elaina',
  id: '720509373020897331',
  description: 'Elaina es un bot de utilidad y música',
  tag: '#1634',
  avatar: 'https://cdn.discordapp.com/avatars/720509373020897331/4855a8f1df6cab97a66fd504be69cf77',
  prefix: 'e!',
  servers: 'N/A',
  votes: '35',
  invites: '115',
  page: [],
  owner: 'Surui#0031'
}

*/

//getUser function example:

dApi.getUser("618634689204322314").then(console.log) //This is id of Surui

/*
return: 

{
  username: 'Surui',
  id: '618634689204322314',
  avatar: 'https://cdn.discordapp.com/avatars/618634689204322314/a_9d57e16f094d0874e61c17c0b9c8e20e',
  description: 'Juego al osu',
  badges: [
    'Moderador Jefe',
    'Promovedor',
    'Seguidor',
    'Usuario de PyroNode',
    'Desarrollador de Bots',
    'HypeSquad Balance',
    'Nitro Classic Subscriber'
  ],
  bots: [
    {
      name: 'Elaina',
      id: '720509373020897331',
      certificate: true,
      botbug: false,
      avatar: 'https://cdn.discordapp.com/avatars/720509373020897331/4855a8f1df6cab97a66fd504be69cf77.webp?size=256',
      votes: '35',
      invites: '115'
    }
  ]
}

Note: Bots array limit 6 items

*/

```
