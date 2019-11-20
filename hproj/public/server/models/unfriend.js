var con=require('./connection');
module.exports=app=>{
	app.post('/unfriend',(req,res)=>{
		var removeRoomSql='delete from chatroom where chatroom_id=?';
		con.aquire((err,con)=>{
			if(err) console.log(err);
			con.query(removeRoomSql,[req.body.friend.chatroom_id]);
			con.release();
		});
		res.send('success');
	});
}