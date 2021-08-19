const fetch = require("node-fetch")

module.exports.getVotes = async (id) => {
	if(!id) throw new TypeError("You must specify the id of the bot.")
	if(!id.match(/\d{17,19}/g)) throw new TypeError("Invalid id.")

	let response = await fetch(`https://page-votes.herokuapp.com/${id}`)
	let json = await response.json()
	if(json.message) throw new TypeError("Invalid id or bot has no vote record.")

	return json
}