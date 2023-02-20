const login = require("./login")

module.exports = (app, body) => {
	app.post("/login", body, (req, res) => {
		let user = req.body.username
		let pass = req.body.password
		console.log(JSON.stringify(req.body))
		let log = login(user, pass)
		res.send(JSON.stringify(log))
	})
	app.post("/server/jacknpoy", body, (req, res) => {
		res.json({"result": "hi"})
	})
}