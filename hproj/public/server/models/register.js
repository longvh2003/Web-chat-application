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
		var insertSql='INSERT INTO User(username,email,user_password,dateOfBirth,gender) value(?,?,?,?,?);';
		var validEmailSql='SELECT * FROM USER WHERE email=?;';
		var validEmail=true;
		var validUsername=true;
		var validQuery='select * from user where username=? or email=?';
		con.aquire((err,con)=>{
			con.query(validQuery,[name,email],(err,rows)=>{
				if(err) console.log(err);
				if(rows.length>0){
					for( var i=0;i<rows.length;i++){
						if(rows[i].email==email) validEmail=false;
						if(rows[i].username==name) validUsername=false;
					}	
					if(!validUsername||!validEmail){
						var msg={invalidEmail:'',invalidUsername:'',oldEmail:req.body.email,oldName:req.body.name};
						if(!validEmail) msg.invalidEmail='this email already token';
						if(!validUsername) msg.invalidUsername='this username already token';
						res.render('register',msg);
					}
				}else{
					con.query(insertSql,[name,email,password,birth,gender],(err)=>{
						if(err) console.log(err);
						console.log('dang ky thanh cong');
						res.redirect('/');
					});
				}
				con.release();
			});
		});

	});
}
