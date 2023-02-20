const express = require("express")
const body_parser = require("body-parser")
const path = require("path")

const backend = require("./backend/index")

const app = express()
const body = body_parser.urlencoded({ extended: false })

let PORT = 3000 | 5000 | process.env.PORT

app.use(body_parser.json())
app.use("/res", express.static(path.join(`${__dirname}/res`)))
app.use('/games', express.static(path.join(`${__dirname}/games`)))

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/res/index.html`)
})

app.get('/jack-n-poy', (req, res) => {
	res.sendFile(`${__dirname}/games/jack_n_poy.html`)
})

backend(app, body)

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})