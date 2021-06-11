const { getInfoBot } = require("./functions/getInfoBot")
const { getUser } = require("./functions/getUser")

getUser("618634689204322314").then(console.log)
module.exports = {
	getInfoBot,
	getUser
}