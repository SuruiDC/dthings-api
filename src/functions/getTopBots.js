const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getTopBots = async () => {

	const $ = await request({
		uri: `https://discordthings.com/bots`, 
		transform: body => load(body)
	})

	info = []

	let votes = []
	$(".dthings-card__flex__description").map((e, i) => votes.push(i.children[0].data.split("|")[0].replace("Votos: ", "").trim()))

	let invites = []
	$(".dthings-card__flex__description").map((e, i) => invites.push(i.children[0].data.split("|")[1].replace("Invites: ", "").trim()))

	let images = []
	$(".dthings-card__flex__image").map((e, i) => images.push(i.attribs.style.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g)[0].replace(");", "").replace('"', "")))

	let status = []
		
	for (var i of $(".dthings-card__flex__badges")){
		status.push(!i.children[0].next ? false : i.children[0].next.children[0].next.attribs.src)
	}

	let names = []
	$(".dthings-card__flex__username").map((e, i) => names.push(i.children[0].data.replaceAll("\n", "")))

	let ids = []
	for (var i of images){
		ids.push(i.match(/\d{17,19}/g)[0])
	}

	let descriptions = []
	$(".dthings-card__flex__sectionText").map((e, i) => descriptions.push(i.children[0].data))

	for (var i in names){
		info.push({
			name: names[i],
			id: ids[i],
			avatar: images[i],
			description: descriptions[i],
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