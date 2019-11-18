var con=require('./connection');
module.exports=app=>{
	app.post('/unfriend',(req,res)=>{
		var sql='delete from friends where currentUser=? and friendUser=?';
		con.aquire((err,con)=>{
			if(err) console.log(err);
			con.query(sql,[req.body.xID,req.session.user.userId]);
			con.query(sql,[req.session.user.userId,req.body.xID]);
			con.release();
		});
		
		res.send('success');
	});
}