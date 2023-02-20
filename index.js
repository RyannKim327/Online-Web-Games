const express = require("express")
const body_parser = require("body-parser")

const backend = require("./backend/index")

const app = express()
const body = body_parser.urlencoded({ extended: false })

app.use(body_parser.json())
app.use("/res", express.static(path.join(`${__dirname}/res`)))

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/res/index.html`)
})

backend(app, body)