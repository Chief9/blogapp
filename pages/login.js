module.exports = (app,  client, bcrypt)=>{
	app.post("/login", (req,results) =>{

			
	


	const query ={
		text : `Select password from users where username = '${req.body.logname}';`
	}
	client.query(query)
	.then((res)=> {
		var hash = res.rows[0].password
		var password = req.body.logpassword
	if(bcrypt.compareSync(password, hash) == true ){
		var name = "login succesful";
		req.session.user = req.body.logname
			
	} else {
		var name = "login unsuccesful"
	} 
	results.render("login", {name:name, user:req.session.user})

	})
})

}
