module.exports = (app, client)=>{

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
}
