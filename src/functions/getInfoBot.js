const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getInfoBot = async (id=String) => {
	
	if(typeof id !== "string") throw "The id must be a string"

	const $ = await request({
		uri: `https://discordthings.com/bot/${id}`, 
		transform: body => load(body)
	})

	if($("title").html() === "DiscordThings | 404") throw "The bot is not registered on the page"

	let info = {
		name: $("title").html().replace("| DiscordThings", "").trim(),
		id: id,
		description: $("meta").next().next().next().attr("content"),
		tag:$(".is-size-4").html(),
		avatar: $(".bvoteArea.pt-5 ").find("img").attr("src"),
		prefix: $(".box-2").html().replace("Prefix: ", "").trim(),
		servers: $(".is-flex.mt-4").next().find("p").html().replace("Servidores: ", ""),
		votes: $(".is-flex.mt-4").next().next().find("p").html().replace("Votos: ", ""),
		invites: $(".is-flex.mt-4").next().next().next().find("p").html().replace("Invitaciones: ", ""),
		tags: [],
		page: [],
		owner: $(".has-text-white.is-size-6").next().html()
	}

	if($(".mt-3").attr("href")){
		$(".mt-3").attr("href").includes("discord.gg" || "discord.com") ? undefined : info.page.push($(".mt-3").attr("href"))
	}
	$(".tag.botTags.mb-1").map((e, i) => info.tags.push(i.children[0].data))

	return info	
}