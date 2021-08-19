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
  votes: '42',
  invites: '129',
  tags: [ 'Music', 'Utility' ],
  page: [],
  owner: 'Surui#8291'
}

*/

//getUser function example:

dApi.getUser("618634689204322314").then(console.log) //This is id of Surui

/*
return: 

{
  username: 'Surui',
  id: '618634689204322314',
  avatar: 'https://cdn.discordapp.com/avatars/618634689204322314/3ff74a98ace51c7bf27611280ee737b1',
  description: 'Juego al osu',
  votes: '47',
  lastSesion: '2021/6/25',
  staff: true,
  points: '0',
  badges: [
    'Balance',
    'Moderador Jefe',
    'Moderador',
    'Desarrollador Certificado',
    'Desarrollador de Bots',
    'Promovedor',
    'Seguidor',
    'Usuario de PyroNode',
    'Cliente PyroNode',
    'Caza Errores Experto'
  ],
  bots: [
    {
      name: 'Elaina ',
      id: '720509373020897331',
      avatar: 'https://cdn.discordapp.com/avatars/720509373020897331/4855a8f1df6cab97a66fd504be69cf77.webp?size=256',
      certificate: true,
      botbug: false,
      votes: '47',
      invites: '177'
    }
  ]
}


*/

//getTopBots example:

dApi.getTopBots().then(console.log)

/*
return:

[
  { name: 'Dynox', votes: '131', invites: '121' },
  { name: 'Troxx', votes: '104', invites: '72' },
  { name: 'Zaida', votes: '95', invites: '460' },
  { name: 'WikiCord', votes: '71', invites: '98' },
  { name: 'Silvia', votes: '44', invites: '96' },
  { name: 'Elaina', votes: '40', invites: '127' },
  { name: 'Cassette', votes: '38', invites: '72' },
  { name: 'Chika Fujiwara', votes: '37', invites: '97' }
]

*/
```
