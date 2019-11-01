var conn=require('./connection');
module.exports=app=>{
	app.post('/addFriends',(req,res)=>{
		var getFriendIdSql='SELECT * FROM user WHERE username=?';
		var add='INSERT INTO friends(currentUser,friendUser) values(?,?)';
		conn.aquire((err,con)=>{
			con.query(getFriendIdSql,req.body.username,(err,rows)=>{
				if(err) console.log('khong tim thay userfriend');
				var friendId=rows[0].user_id;
				con.query(add,[req.session.user.userId,friendId],(err)=>{
					if(err) console.log('loi sql them ban');
					console.log('them ban thanh cong');
				});
				con.release();
			});
		});
	});
	app.get('/addFriends',(req,res)=>{
		var getListSql='SELECT * FROM USER JOIN friends ON user_id=currentUser WHERE user_id=?';

		conn.aquire((err,conn)=>{
			conn.query(getListSql,[req.session.user.userId],(err,rows)=>{
				res.send(rows);
				console.log(rows);
			});
			conn.release();
		});
	});
}