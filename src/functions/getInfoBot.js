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
		avatar: $(".botImg-voteArea.mt-0.floating").find("img").attr("src"),
		prefix: $(".box-2").html().replace("Prefix: ", "").trim(),
		servers: $(".is-flex.mt-4").next().find("p").html().replace("Servidores: ", ""),
		votes: $(".is-flex.mt-4").next().next().find("p").html().replace("Votos: ", ""),
		invites: $(".is-flex.mt-4").next().next().next().find("p").html().replace("Invitaciones: ", ""),
		page: [],
		owner: $(".has-text-white.is-size-6").next().html()
	}

	try{
		let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  		for (var i of $(".bvoteArea.pt-5 ").html().match(reg)){
    		i.startsWith("https://cdn.discordapp.com/") || i.startsWith("https://discord.gg/") || i.startsWith("https://discord.com/invite/") ? undefined : info.page.push(i)
  		}
	} catch (e) {
		info.page = []
	}

	return info	
}