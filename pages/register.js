module.exports = (app, client)=>{

app.get("/register", (req,res) => {
	res.render("register",{user:req.session.user})
})
}