module.exports = (app, client)=>{
	app.get("/", (req,res) => {
	res.render("index", {user:req.session.user, name:"Welcome"})
})
}