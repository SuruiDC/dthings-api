const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getTopBots = async () => {

	const $ = await request({
		uri: `https://discordthings.com`, 
		transform: body => load(body)
	})

	let stats = []
	for (var i of $(".tooltiptext").text().split(" ")){
		i.length < 1 || i === "Invites:" || i === "Votos:" || i === "Votes:"? undefined : stats.push(i.replace("Votos:", "").replace("Votes:", "")) 
	}
	stats = stats.slice(0 , 16)

	let names = []
	$(".cardBotName.has-text-white.mt-5.has-text-centered").map((e,i) => names.push(i.children[0].data.trim()))
	names = names.slice(0, 8)

	let info = []
	for (var i = 0; i < 8; i++){
		info.push({
			name: names[i],
			votes: stats[i],
			invites: stats[i + 1],
		})
		stats.shift()
	}
	return info
}