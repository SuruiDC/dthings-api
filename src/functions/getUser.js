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
		username: $(".UserName.is-size-5.has-text-white").text().trim(),
		id: id,
		avatar: $(".rounded-circle").attr("src"),
		description: $(".text-center").find("p").html().trim(),
		votes: $(".heading.has-text-white").html().replace("\n", ""),
		lastSesion: $(".card-profile-stats.d-flex.justify-content-center.mt-md-5").find("div").next().next().children().html().replace("\n", ""),
		badges: [],
		bots: []
	}

	for (var i of $(".tooltip").text().replace(/Votos: \d*/g, "").replace(/Invites \d*/g, "").trim().split("\n")){
		i === "" ? undefined : info.badges.push(i)
	}

	if(!$(".box.botCard.bg-dark").html()) info.bots = []
	else{
		info.bots.push({
			name: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
			id: $(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
			certificate: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
			botbug: $(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
			avatar: $(".centrado.card-img-top").attr("src"),
			votes: $(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
			invites: $(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
		})

		$(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
				id: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				botbug: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				avatar: $(".column.is-4.mb-5").next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				votes: $(".column.is-4.mb-5").next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
				invites: $(".column.is-4.mb-5").next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
				id: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				botbug: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				avatar: $(".column.is-4.mb-5").next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				votes: $(".column.is-4.mb-5").next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
				invites: $(".column.is-4.mb-5").next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				botbug: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				avatar: $(".column.is-4.mb-5").next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				votes: $(".column.is-4.mb-5").next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
				invites: $(".column.is-4.mb-5").next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				botbug: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<span data-tippy-content="Bot Bug" class="tippy has-text-centered"><i class="fas fa-virus"></i></span>'),
				avatar: $(".column.is-4.mb-5").next().next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				votes: $(".column.is-4.mb-5").next().next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
				invites: $(".column.is-4.mb-5").next().next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
			})
		) : undefined

		$(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").html() ? (
			info.bots.push({
				name: $(".column.is-4.mb-5").next().next().next().next().next().next().find(".cardBotName.has-text-white.mt-5.has-text-centered").html().replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").replace('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">',"").trim(),
				id: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBtn1").attr("title").split(" ")[0],
				certificate: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265017564594186/certifiedbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				botbug: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".cardBotName.has-text-white.mt-5.has-text-centered").html().includes('<img draggable="false" src="https://cdn.discordapp.com/attachments/855976462690942977/856265022720049173/bugbot-dthings.png" class="tooltip mr-1" width="25px" height="25px">'),
				avatar: $(".column.is-4.mb-5").next().next().next().next().next().find(".box.botCard.bg-dark").find(".centrado.card-img-top").attr("src"),
				votes: $(".column.is-4.mb-5").next().next().next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[0].trim().replace("Votos: ", ""),
				invites: $(".column.is-4.mb-5").next().next().next().next().next().find(".tooltip.centrado").find("span").html().trim().split("<br>")[1].trim().replace("Invites ", "")
			})
		) : undefined
	}

	return info
}