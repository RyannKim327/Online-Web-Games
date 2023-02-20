module.exports = async (app, body) => {
	app.post("server/jacknpoy", body, (req, res) => {
		res.json({"result": "hi"})
	})
}