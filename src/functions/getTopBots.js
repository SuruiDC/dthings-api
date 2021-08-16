const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getTopBots = async () => {

	const $ = await request({
		uri: `https://discordthings.com/bots`, 
		transform: body => load(body)
	})

	info = []

	let votes = []
	$(".level.dthingscenter").map((e, i) => votes.push(i.children[0].data.replace("\n", "").replace("\n", "").replace("Votos: ", "")))

	let invites = []
	$(".points.dthingscenter").map((e, i) => invites.push(i.children[0].data.replace("\n", "").replace("\n", "").replace("Invites: ", "")))

	let images = []
	$(".additional").find("img").map((e, i) => images.push(i.attribs.src))

	let status = []
	$(".general").find("img").map((e, i) => status.push(i.attribs.src === null ? false : i.attribs.src))

	let names = []
	$(".general").find("h1").map((e, i) => names.push(i.children[0].data.replace("\n", "")))

	let ids = []
	for (var i of images){
		ids.push(i.match(/\d{17,19}/g)[0])
	}

	let descriptions = []
	$(".general").find("p").map((e, i) => descriptions.push(i.children[0].data))

	for (var i in names){
		info.push({
			name: names[i],
			id: ids[i],
			avatar: images[i],
			certificate: status[i] ? (
				status[i].includes("https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png")
			) : false,
			botbug : status[i] ? (
				status[i].includes("https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png")
			) : false,
			votes: votes[i],
			invites: invites[i]
		})
	}
	return info
}