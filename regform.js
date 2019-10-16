module.exports = function(app, conn){
	app.route('/regform')
	.get(function(req, res){
		res.render('regForm');
	})
	.post(function(req, res){
		var name = req.body.name;
		var email = req.body.email;
		var pass = req.body.password;
		var user = [name, pass, email];
		var sql = `INSERT INTO User(Name, Pass, Email)
					VALUE(?,?,?)`;
		conn.query(sql, user,  (err, results, fields) => {
  			if (err) {
    			res.redirect('/regform')
  			}
  		res.redirect('/');
	});
	});
}