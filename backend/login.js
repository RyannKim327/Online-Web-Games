const fs = require("fs")

module.exports = (user, pass) => {
	if(user == undefined || pass == undefined){
		return {
			statusCode: 404,
			isExist: false,
			canLogin: false,
			username: null,
			userID: null
		}
	}
	if(user == null || pass == null){
		return {
			statusCode: 404,
			isExist: false,
			canLogin: false,
			username: null,
			userID: null
		}
	}
	let data = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
	if(data[user.toLowerCase()] == null){
		let users = Object.keys(data)
		data[user.toLowerCase()] = {
			username: user,
			password: pass,
			userID: users.length
		}
		fs.writeFileSync("data/users.json", JSON.stringify(data), "utf-8")
		return {
			statusCode: 200,
			isExist: true,
			canLogin: true,
			username: user,
			userID: users.length
		}
	}else{
		if(data[user.toLowerCase()]['password'] == pass){
			return {
				statusCode: 200,
				isExist: true,
				canLogin: true,
				userID: data[user.toLowerCase()]['userID'],
				username: data[user.toLowerCase()]['username']
			}
		}else{
			return {
				statusCode: 200,
				isExist: true,
				canLogin: false,
				userID: null,
				username: null
			}
		}
	}
}