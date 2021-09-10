const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getInfoBot = async (id=String) => {
	
	if(typeof id !== "string") throw new TypeError("The id must be a string")

	const $ = await request({
		uri: `https://discordthings.com/bot/${id}`, 
		transform: body => load(body)
	})

	if($(".text-muted.text-bold").html()) throw new Error("The bot is not registered on the page")

	let results = []
	$(".float-right.has-text-white").map((e, i) => results.push(i.children[0].data))

	let info = {
		name: $("meta").attr("content").replace("en DiscordThings", "").trim(),
		id: id,
		description: $(".lead.dthings__main__subtitle.mb-2").html().trim(),
		avatar: $(".botlogo").attr("src"),
		prefix: results[0],
		servers: results[1],
		votes: results[2],
		invites: results[3],
		tags: [],
		page: [],
		owner: $("meta").next().next().next().attr("content").split("|")[1].trim()
	}
	let links = []
	$(".col.col4").next().next().find(".mt-3").map((e, i) => links.push(i.attribs.href))

	for (var i of links){
		!i || i.includes("discord.gg" || "discord.com") ? undefined : info.page.push(i)
	}
	$(".tag.botTags.mb-1").map((e, i) => info.tags.push(i.children[0].data))

	return info	
}