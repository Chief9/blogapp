module.exports = (app, bcrypt, client)=>{
app.post("/registerF", (req,results) => {


bcrypt.hash(req.body.regpassword, 4, function(err, hash) {
	const query = {
		text: `insert into users (username, password, email) values ('${req.body.regname}','${hash}','${req.body.regemail}');`
			}
	client.query(query)
	.then ((res)=> {
		req.session.user = req.body.regname 
		results.render("register", {user:req.session.user})
	})
    });
});


}

