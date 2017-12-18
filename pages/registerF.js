module.exports = (app, bcrypt, client) => {
        app.post("/registerF", (req, results) => {

                    const query = {
                        text: `Select * from users where username = '${req.body.regname}';`
                    }

                    client.query(query)
                        .then((res) => {
                        	console.log(res.rows.length)
                            if (res.rows.length == 0){
                            	var error = ""
                                if (req.body.regpassword == req.body.regpassword2) {
                                    req.session.user = req.body.regname
                                    bcrypt.hash(req.body.regpassword, 4,  function(err,  hash) {

                                        const query2 = {
                                            text: `insert into users (username, password, email) values ('${req.body.regname}','${hash}','${req.body.regemail}');`
                                        }
                                        client.query(query2)
                                        console.log(req.session.user)
                                    })
                                } else {
                                    var error = "passwords are not the same"
                                }

                            } else {
                            	var error = "Username already exists"
                            }
                            results.render("register", { user: req.session.user, error: error })
                        })
                })
}