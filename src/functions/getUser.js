const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getUser = async (id=String) => {

	if(typeof id !== "string") throw new TypeError("The id must be a string")

	const $ = await request({
		uri: `https://discordthings.com/u/${id}`, 
		transform: body => load(body)
	})

	if($(".text-muted.text-bold").html()) throw new Error("The user is not registered on the page")


	let info = {
		username: $(".dthings__main__title.mt-2").text().trim(),
		id: id,
		avatar: $(".botlogo").attr("src"),
		description: $(".lead.dthings__main__subtitle.mb-2").text().trim(),
		votes: 0,
		staff: Boolean,
		points: String,
		badges: [],
		bots: []
	}

	let defaultBadges = [
    	'Brilliance',
    	'Developer',
    	'Nitro Classic',
    	'Administrador',
    	'Moderador',
    	'Desarrollador Certificado',
    	'Desarrollador de Bots',
    	'Promovedor',
    	'Seguidor',
    	'Usuario de PyroNode',
    	'Cliente PyroNode',
    	'Caza Errores Experto',
    	'Caza Errores'
  	]
	for (var i of $(".tooltip2").text().replace(/Votos: \d*/g, "").replace(/Invites \d*/g, "").trim().split("\n")){
		i === "" || i === " " || !defaultBadges.includes(i.trim()) ? undefined : info.badges.push(i.trim())
	}

	/Puntos: \d*/g.test($(".tooltip2").find("span").html()) ? (
		info.points = $(".tooltip2").find("span").html().replace("Puntos: ", ""),
		info.staff = true 
	) : (
		info.points = "0",
		info.staff = false
	)

	if($(".dthings-card__flex h-100.has-banner-image").html()) info.bots = []
	else{
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
			info.bots.push({
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

		for (var i of votes){
			info.votes = info.votes + parseInt(i)
		}
	} 

	return info
}