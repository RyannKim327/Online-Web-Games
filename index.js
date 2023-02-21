const fs = require("fs")
const express = require("express")
const body_parser = require("body-parser")
const path = require("path")

const app = express()
const body = body_parser.urlencoded({ extended: true })

const backend = require("./backend/index")

let PORT = 3000 | 5000 | process.env.PORT

app.use(body_parser.json())
app.use("/res", express.static(path.join(`${__dirname}/res`)))
app.use('/games', express.static(path.join(`${__dirname}/games`)))

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/res/index.html`)
})

app.get('/checkCredentials', (req, res) => {
	let user = req.query.user
	let data = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))

	return {
		"isExists": data[user.toLowerCase()] == undefined
	}
})

app.get('/jack-n-poy', (req, res) => {
	res.sendFile(`${__dirname}/games/jack_n_poy.html`)
})

backend(app, body)

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})