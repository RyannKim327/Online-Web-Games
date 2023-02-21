const login = require("./login")
const encrypt = require("./../utils/encryptions")

module.exports = (app, body) => {
	app.post("/login", body, (req, res) => {
		let user = req.body.username
		let pass = encrypt(req.body.password)
		let log = login(user, pass)
		res.send(JSON.stringify(log))
	})
	app.post("/server/jacknpoy", body, (req, res) => {
		res.json({"result": "hi"})
	})
}