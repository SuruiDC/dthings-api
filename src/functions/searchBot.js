const { load } = require("cheerio")
const request = require("request-promise")
const { getInfoBot } = require("./getInfoBot.js")

module.exports.searchBot = async (name=String) => {
	if(typeof name !== "string") throw new TypeError("The name must be a string")
	if(name.match(/\d{17,19}/g)) throw new TypeError("The name cannot be an id")

	let $ = await request({
		uri: `https://discordthings.com/search?q=${name.replace(/[^a-zA-z0-9 ]/g, "").replace(" ", "+")}&page=1`, 
		transform: body => load(body)
	})
	if($(".text-muted.text-bold").html()) throw new Error("Results 0")

	let id = $(".img-fluid").attr("src").match(/\d{17,19}/g)[0]

	let info = await getInfoBot(id)


	return info	
}