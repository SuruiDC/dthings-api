const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getTopBots = async () => {

	const $ = await request({
		uri: `https://discordthings.com/bots`, 
		transform: body => load(body)
	})

	info = []

	let stats = []
	for (var i of $(".is-inline-block").text().split(" ")){
		i.length < 1 || i === "Invites:" || i === "Votos:" || i === "Votes:" || i === "\nVotos:" ? undefined : stats.push(i.replace("Votos:", "").replace("Votes:", "").replace("\n\nInvites:", "").replace("\n", "").replace("\n", "").replace("Invites: ", "")) 
	}

	let images = []
	$(".card-custom-avatar").map((e, i) => images.push(i.children[0].next.attribs.src))

	let status = []
	$(".card-title.has-text-white.is-3").map((e, i) => status.push(i.children[0].next === null ? false : i.children[0].next.attribs.src))

	let names = []
	$(".card-title.has-text-white.is-3").map((e, i) => names.push(i.children[0].data))

	let ids = []
	for (var i of images){
		ids.push(i.match(/\d{17,19}/g)[0])
	}

	let descriptions = []
	$(".col-md-6.col-lg-4.pb-3").find(".card-body").map((e, i) => descriptions.push(i.children[3].children[0].data))

	for (var i in names){
		info.push({
			name: names[i],
			id: ids[i],
			certificate: status[i] ? (
				status[i].includes("https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png")
			) : false,
			botbug : status[i] ? (
				status[i].includes("https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png")
			) : false,
			votes: stats[i],
			invites: stats[parseInt(i) + 1]
		})
		stats.shift()
	}
	return info
}