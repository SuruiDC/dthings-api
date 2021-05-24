const { load } = require("cheerio")
const request = require("request-promise")

async function getInfoBot(id=String){
	if(typeof id !== "string") throw "The id must be a string"

	const $ = await request({
		uri: `https://bots.discordthings.com/bot/${id}`, 
		transform: body => load(body)
	})

	if($("title").html() === "DiscordThings | 404") throw "The bot is not registered on the page"

	let info = {
		name: $(".BotName.is-size-2.has-text-white").text().trim(),
		id: id,
		certificate: $(".BotName.is-size-2.has-text-white").html().includes('<span data-tippy-content="Certificado" class="tippy" style="font-size: 28px;"><i data-tippy-content="Certificado" class="tippy fad fa-award"></i></span>'),
		botbug: $(".BotName.is-size-2.has-text-white").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered" style="font-size: 28px;"><i class="fas fa-virus"></i></span>'),
		description: $(".BotDesc2.mt-1").text(),
		prefix: $(".box-2").html().trim().replace("Prefix:", "").trim(),
		servers: $('div.is-flex.mt-4').next().find("p").html().replace("Servidores:", "").trim(),
		votes: $('div.is-flex.mt-2').find("p").html().replace("Votos:", "").trim(),
		invites: $('div.is-flex.mt-2').next().find("p").html().replace("Invitaciones:", "").trim(),
		tags: [],
		page: [],
		owners: []
	}

	info.tags.push($(".mb-1").find("span").html())
  	$(".mb-1").next().find("span").html() ? info.tags.push($(".mb-1").next().find("span").html()) : undefined
  	$(".mb-1").next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().find("span").html()) : undefined
  	$(".mb-1").next().next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().next().find("span").html()) : undefined
  	$(".mb-1").next().next().next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().next().next().find("span").html()) : undefined

  	let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  	for (var i of $(".column.is-3.sidebar").html().match(reg)){
    	i.startsWith("https://cdn.discordapp.com/") || i.startsWith("https://discord.gg/") || i.startsWith("https://discord.com/invite/") ? undefined : info.page.push(i)
  	}

  	info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().find("p").html())
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
	return info	
}

async function searchBot(name){
	if(typeof name !== "string") throw "The name must be a string"
	let $; 

	$ = await request({
		uri: `https://bots.discordthings.com/search?q=${name.replace(" ", "+")}&page=1`, 
		transform: body => load(body)
	})
	if($("title").html() === "DiscordThings | 404") throw "No bot with a similar name was found"

	let id = $(".cardButtons.is-flex").html().match(/\d{17,19}/g)[0]

	$ = await request({
		uri: `https://bots.discordthings.com/bot/${id}`, 
		transform: body => load(body)
	})
	let info = {
		name: $(".BotName.is-size-2.has-text-white").text().trim(),
		id: id,
		certificate: $(".BotName.is-size-2.has-text-white").html().includes('<span data-tippy-content="Certificado" class="tippy" style="font-size: 28px;"><i data-tippy-content="Certificado" class="tippy fad fa-award"></i></span>'),
		botbug: $(".BotName.is-size-2.has-text-white").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered" style="font-size: 28px;"><i class="fas fa-virus"></i></span>'),
		description: $(".BotDesc2.mt-1").text(),
		prefix: $(".box-2").html().trim().replace("Prefix:", "").trim(),
		servers: $('div.is-flex.mt-4').next().find("p").html().replace("Servidores:", "").trim(),
		votes: $('div.is-flex.mt-2').find("p").html().replace("Votos:", "").trim(),
		invites: $('div.is-flex.mt-2').next().find("p").html().replace("Invitaciones:", "").trim(),
		tags: [],
		page: [],
		owners: []
	}

	info.tags.push($(".mb-1").find("span").html())
  	$(".mb-1").next().find("span").html() ? info.tags.push($(".mb-1").next().find("span").html()) : undefined
  	$(".mb-1").next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().find("span").html()) : undefined
  	$(".mb-1").next().next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().next().find("span").html()) : undefined
  	$(".mb-1").next().next().next().next().find("span").html() ? info.tags.push($(".mb-1").next().next().next().next().find("span").html()) : undefined

  	let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  	for (var i of $(".column.is-3.sidebar").html().match(reg)){
    	i.startsWith("https://cdn.discordapp.com/") || i.startsWith("https://discord.gg/") || i.startsWith("https://discord.com/invite/") ? undefined : info.page.push(i)
  	}

  	info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().find("p").html())
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined
  	$('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html() ? info.owners.push($('.is-flex.mt-4').next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().find("p").html()) : undefined

	return info
}

module.exports = {
	getInfoBot,
	searchBot
}