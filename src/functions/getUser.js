const { load } = require("cheerio")
const request = require("request-promise")

module.exports.getUser = async (id=String) => {

	if(typeof id !== "string") throw new TypeError("The id must be a string")

	const $ = await request({
		uri: `https://discordthings.com/u/${id}`, 
		transform: body => load(body)
	})

	if($("title").html() === "DiscordThings | 404") throw new Error("The user is not registered on the page")

	let info = {
		username: $(".is-size-5.has-text-white.title").text().trim(),
		id: id,
		avatar: $(".rounded-circle").attr("src"),
		description: $(".col").find("p").next().html().trim(),
		votes: $(".col").find("center").next().next().next().next().next().find("p").next().next().next().html().replace("\n", ""),
		lastSession: $(".col").find("center").next().next().next().next().next().find("p").next().html(),
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

	if(!$(".dthingscard2.centrado").html()) info.bots = []
	else{
		let votes = []
		$(".level.dthingscenter").map((e, i) => votes.push(i.children[0].data.replace("\n", "").replace("\n", "").replace("Votos: ", "")))

		let invites = []
		$(".points.dthingscenter").map((e, i) => invites.push(i.children[0].data.replace("\n", "").replace("\n", "").replace("Invites: ", "")))

		let images = []
		$(".additional").find("img").map((e, i) => images.push(i.attribs.src))

		let status = []
		$(".general").find("img").map((e, i) => status.push(i.attribs.src === null ? false : i.attribs.src))

		let names = []
		$(".general").find("h1").map((e, i) => names.push(i.children[0].data.replace("\n", "")))

		let ids = []
		for (var i of images){
			ids.push(i.match(/\d{17,19}/g)[0])
		}

		let descriptions = []
		$(".general").find("p").map((e, i) => descriptions.push(i.children[0].data))

		for (var i in names){
			info.bots.push({
				name: names[i],
				id: ids[i],
				avatar: images[i],
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
	} 

	return info
}