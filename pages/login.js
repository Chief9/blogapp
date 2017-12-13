module.exports = (app, client)=>{
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

}
