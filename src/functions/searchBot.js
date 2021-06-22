const { load } = require("cheerio")
const request = require("request-promise")

module.exports.searchBot = async (name=String) => {
	if(typeof name !== "string") throw new TypeError("The name must be a string")
	if(name.match(/\d{17,19}/g)) throw new TypeError("The name cannot be an id")

	let $ = await request({
		uri: `https://discordthings.com/search?q=${name.replace(" ", "+")}&page=1`, 
		transform: body => load(body)
	})
	if($("title").html() === "DiscordThings | 404") throw new Error("Results 0")

	let id = $(".img-fluid").attr("src").match(/\d{17,19}/g)[0]
	$ = await request({
		uri: `https://discordthings.com/bot/${id}`, 
		transform: body => load(body)
	})

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