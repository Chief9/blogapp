module.exports = (app,  client, bcrypt)=>{
	app.post("/login", (req,results) =>{

		const query= {
			text:`Select * from users where username = '${req.body.logname}'`
		}
		
		client.query(query)
		.then ((res)=>{
			if (res.rows.length !== 0){
					var name ="" 
					var hash = res.rows[0].password
					var password = req.body.logpassword
					if(bcrypt.compareSync(password, hash) == true ){
						var name = "login succesful";
						req.session.user = {
							id: res.rows[0].id,
							name: res.rows[0].username
						}

					} else {
						var name = "Password incorrect"
					}	
			
				
					
			} else {
				var name = "Username not found"	
			} 

		results.render("login", {name:name, user:req.session.user})
		})
	})

}
