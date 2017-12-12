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

app.post("/registerF", (req,results) => {

	const query = {
		text: `insert into users (username, password, email) values ('${req.body.regname}','${req.body.regpassword}','${req.body.regemail}');`
			}
	client.query(query)
	.then ((res)=> {
		results.render("index")
	})


})


app.post("/login", (req,results) =>{

	const query ={
		text : `Select *  from users where username = '${req.body.logname}' and password = '${req.body.logpassword}';`
	}
	client.query(query)
	.then((res)=> {
	if(res.rows.length !== 0){
		var name = "login succesful";
		req.session.user = req.body.logname
			
	} else {
		var name = "login unsuccesful"
	} 
	results.render("login", {name:name, user:req.session.user})

	})
	


})

app.post("/write", (req, results) => {
   const query = {
       text: `insert into messages (title,body, user_id) SELECT '${req.body.title}','${req.body.message}', users.id FROM users WHERE users.username = '${req.session.user}';`
   }

	client.query(query)
	.then ((res) => {
		results.redirect("read")
})

})



app.get("/", (req,res) => {
	res.render("index", {user:req.session.user, name:"Welcome"})
})

app.get("/read", (req,results) => {
	  const query = {
		text: "select messages.title, messages.body, users.username from messages INNER JOIN users on messages.user_id = users.id;"
	}
	client.query(query)
	.then ((res) => {
		var lijst = res.rows
		results.render("read", {lijst:lijst, user:req.session.user})
		})
})


app.get("/login", (req,res) => {
	res.render("login", {user:req.session.user})
})

app.get("/register", (req,res) => {
	res.render("register")
})

app.get("/logout", (req,res)=> {
	req.session.destroy()

		res.render("index", {name:"Succesfully logged out"} )
})



app.listen(process.env.webport, function(){
	console.log("3k bby")
})