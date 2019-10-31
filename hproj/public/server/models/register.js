import con from './connection';

module.exports = app=>{
	app.route('/createAccount').get((req,res)=>{
		res.render('register');
	}).post((req,res)=>{
		var name=req.body.name;
		var email=req.body.email;
		var password=req.body.password;
		var birth=req.body.year+'-'+req.body.month+'-'+req.body.date;
		var gender=req.body.gender;
		var insertSql='INSERT INTO User(username,email,password,dateOfBirth,gender) value(?,?,?,?,?);';
		var validEmailSql='SELECT * FROM USER WHERE email=?;';

		con.aquire((err,con)=>{
			con.query(validEmailSql,[email],(err,rows)=>{
			if(err) console.log(err);
			if(rows.length==0){
				con.query(insertSql,[name,email,password,birth,gender],(err,rows)=>{
						if(err) console.log(err);
						res.redirect('/');
					});
			}else{
				res.render('register',{
					invalidEmail: 'This email already token',
					oldName:req.body.name,
					oldEmail:req.body.email
				});				
			}
		});
		});		
	});
}
