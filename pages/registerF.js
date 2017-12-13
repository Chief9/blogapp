module.exports = (app, client)=>{
app.post("/registerF", (req,results) => {

	const query = {
		text: `insert into users (username, password, email) values ('${req.body.regname}','${req.body.regpassword}','${req.body.regemail}');`
			}
	client.query(query)
	.then ((res)=> {
		req.session.user = req.body.regname 
		results.render("register", {user:req.session.user})
	})


})

}