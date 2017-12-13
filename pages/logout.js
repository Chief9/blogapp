module.exports = (app, client)=>{


app.get("/logout", (req,res)=> {
	req.session.destroy()

		res.render("index", {name:"Succesfully logged out"} )
})
}