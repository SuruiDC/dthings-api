const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getUser = async (id=String) => {

	if(typeof id !== "string") throw "The id must be a string"

	const $ = await request({
		uri: `https://discordthings.com/u/${id}`, 
		transform: body => load(body)
	})

	if($("title").html() === "DiscordThings | 404") throw "The user is not registered on the page"

	let info = {
		username: $(".UserName.is-size-2.has-text-white").text().trim(),
		id: id,
		avatar: $(".column.is-2").find("img").attr("src"),
		description: $(".UserDesc2.mt-1.has-text-white").html().trim(),
		badges: [],
		bots: []
	}

	$(".fad.fa-angel.tippy.mr-2").attr("data-tippy-content") ? info.badges.push($(".fad.fa-angel.tippy.mr-2").attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".tippy.mr-1").next().next().next().next().next().next().next().next().next().next().attr("data-tippy-content") ? info.badges.push($(".tippy.mr-1").next().next().next().next().next().next().next().next().next().next().attr("data-tippy-content")) : undefined
	$(".fad.fa-virus-slash.tippy.mr-2").attr("data-tippy-content") ? info.badges.push($(".fad.fa-virus-slash.tippy.mr-2").attr("data-tippy-content")) : undefined
	$(".fad.fa-badge-check.has-text-info.tippy mr-2").attr("data-tippy-content") ? info.badges.push($(".fad.fa-badge-check.has-text-info.tippy mr-2").attr("data-tippy-content")) :undefined

	if(!$(".box.botCard.bg-dark")) info.bots = []
	else{
		info.bots.push({
			name: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
			id: $(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
			certificate: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
			botbug: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
			avatar: $(".centrado.card-img-top").attr("src"),
			description: $(".cardBotDesc.mt-1.has-text-centered").html()
		})

		$(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
				id: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
				botbug: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				description: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBotDesc.mt-1.has-text-centered").html()
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
				id: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
				botbug: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				description: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBotDesc.mt-1.has-text-centered").html()
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
				botbug: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				description: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBotDesc.mt-1.has-text-centered").html()
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
				botbug: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				description: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotDesc.mt-1.has-text-centered").html()
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().next().next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>',"").replace('span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Certificado" class="tippy has-text-centered"><i class="fad fa-award"></i></span>'),
				botbug: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				description: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotDesc.mt-1.has-text-centered").html()
			})
		) : undefined
	}
	

	return info
}