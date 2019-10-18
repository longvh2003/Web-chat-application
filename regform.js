module.exports = function(app, conn){
	app.route('/regform')
	.get(function(req, res){
		res.render('regForm');
	})
	.post(function(req, res){
		// validEmail=true;
		var name = req.body.name;
		var email = req.body.email;
		var pass = req.body.password;
		var user = [name, pass, email];
		var sql = `INSERT INTO User(Name, Pass, Email)
					VALUE(?,?,?)`;
		var errorSql='SELECT * FROM User WHERE Email=?';

		

		conn.query(errorSql,[email],(err,rows)=>{
			if(err) console.log(err);
			if(rows.length==0) {
				conn.query(sql, user,  (err, results, fields) => {
	  				if (err) {
	    				res.redirect('/regform')
	  				}
	  				res.redirect('/');
				});
			}else{
				res.render('regForm',{
					invalidEmail: 'This email already token',
					oldName:req.body.name,
					oldEmail:req.body.email
				});
			}			
		});
	});

}