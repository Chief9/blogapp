module.exports = (app, client)=>{
app.post("/write", (req, results) => {
   const query = {
       text: `insert into messages (title,body, user_id) SELECT '${req.body.title}','${req.body.message}', users.id FROM users WHERE users.username = '${req.session.user}';`
   }

	client.query(query)
	.then ((res) => {
		results.redirect("read")
	})

})


}