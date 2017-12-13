const express = require("express")
const app = express()
const pg = require("pg")
const Client = pg.Client
const bodyParser = require("body-parser")
const session = require("express-session")

require('dotenv').load();

app.use(bodyParser.urlencoded({ extended:true }))

app.set('view engine', 'pug')

app.use(session({
	secret:"geheim",
	resave: true,
	saveUninitialized: false

}))

const client = new Client({

	user: process.env.POSTGRES_USER,
	host: process.env.host,
	database: process.env.database,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.databaseport,

})

client.connect()

require("./pages/registerF")(app, client)

require("./pages/login")(app, client)

require("./pages/write")(app, client)

require("./pages/home")(app)

require("./pages/read")(app, client)

require("./pages/loginF")(app)

require("./pages/register")(app)

require("./pages/logout")(app)

app.listen(process.env.webport, function(){
	console.log("3k bby")
})