var con=require('./connection');
module.exports = app=>{
	app.post('/removeInvi',(req,res)=>{
		var sql='delete from invitation where user1=? and user2=?';
		con.aquire((err,conn)=>{
			conn.query(sql,[req.body.userSend,req.session.user.userId]);
			
		});
		res.send('success');
	});
}