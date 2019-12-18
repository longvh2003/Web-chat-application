var con=require('./connection');
module.exports = (app)=>{
	app.post('/updateProfile',(req,res)=>{
		console.log(req.body);
		var newBirth=req.body.birth;
		var oldPass=req.body.oldpass;
		var newPass=req.body.newpass;
		var confirmPass=req.body.confirmnewpass;
		var gender=req.body.gender;
		con.aquire((err,con)=>{
			con.query('select * from user where user_id=? and user_password=?',[req.session.user.userId,oldPass],(err,rows)=>{
				if(rows.length==0){
					res.send('mat khau sai');
					console.log('mat khau sai');
				}else{
					con.query('update user set user_password =? where user_id=?',[newPass,req.session.user.userId]);
					con.query('update user set gender=? where user_id=?',[gender,req.session.user.userId]);
					con.query('update user set dateOfBirth=? where user_id=?',[newBirth,req.session.user.userId]);

					res.redirect('/');
				}
			});
		});
	});
}