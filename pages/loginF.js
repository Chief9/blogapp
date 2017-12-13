module.exports = (app, client)=>{
	app.get("/login", (req,res) => {
	res.render("login", {user:req.session.user})
})

}