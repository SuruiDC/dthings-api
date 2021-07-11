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
		username: $(".UserName.is-size-5.has-text-white").text().trim(),
		id: id,
		avatar: $(".rounded-circle").attr("src"),
		description: $(".text-center").find("p").html($(".text-center").find("p").html()).text().trim(),
		votes: $(".heading.has-text-white").html().replace("\n", ""),
		lastSesion: $(".card-profile-stats.d-flex.justify-content-center.mt-md-5").find("div").next().next().children().html().replace("\n", ""),
		staff: Boolean,
		points: String,
		badges: [],
		bots: []
	}

	for (var i of $(".tooltip").text().replace(/Votos: \d*/g, "").replace(/Invites \d*/g, "").trim().split("\n")){
		i === "" || i === " " ? undefined : info.badges.push(i)
	}

	/Puntos: \d*/g.test(info.badges[0]) ? (
		info.points = info.badges.shift().replace("Puntos: ", ""),
		info.staff = true 
	) : (
		info.points = "0",
		info.staff = false
	)

	if(!$(".col-md-6.col-lg-4.pb-3").html()) info.bots = []
	else{
		let stats = []
		for (var i of $(".is-inline-block").text().replace(/[\n\r]/g,'').split(" ")){
			i.length < 1 || i === "Invites:" || i === "Votos:" || i === "Votes:" || i === "\nVotos:" || i === "Invites:" ? undefined : stats.push(i.replace("Votos:", "").replace("Votes:", "").replace("\n\nInvites:", "").replace("\n", "").replace("\n", "").replace("Invites:", "")) 
		}
		let images = []
		$(".card-custom-avatar").map((e, i) => images.push(i.children[0].next.attribs.src))

		let status = []
		$(".card-title.has-text-white.is-3").map((e, i) => status.push(i.children[0].next === null ? false : i.children[0].next.attribs.src))

		let names = []
		$(".card-title.has-text-white.is-3").map((e, i) => names.push(i.children[0].data))

		let ids = []
		for (var i of images){
			ids.push(i.match(/\d{17,19}/g)[0])
		}

		let descriptions = []
		$(".col-md-6.col-lg-4.pb-3").find(".card-body").map((e, i) => descriptions.push(i.children[3].children[0].data))

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
				votes: stats[i],
				invites: stats[parseInt(i) + 1]
			})
			stats.shift($(".is-inline-block").text().split(" "))
		}
	} 

	return info
}