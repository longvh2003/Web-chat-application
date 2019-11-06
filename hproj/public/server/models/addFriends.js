var conn=require('./connection');
module.exports=app=>{
	app.post('/addFriends',(req,res)=>{
		var getFriendIdSql='SELECT * FROM user WHERE username=?';
		var add='INSERT INTO friends(currentUser,friendUser) values(?,?)';
		
		var addRoom='INSERT INTO chatroom(chatroom_name, member_num) VALUES (?,?)';
		var addUserRoom='INSERT INTO userchatroom VALUES (?,?),(?,?)';
		console.log(req.session.user);
		conn.aquire((err,con)=>{
			if(req.body.username!=req.session.user.username){
				con.query(getFriendIdSql,req.body.username,(err,rows)=>{
					if(err) console.log('khong tim thay userfriend');
					var friendId=rows[0].user_id;
					con.query('select * from friends where currentUser=? and friendUser=?',[req.session.user.userId,friendId],(err,rows)=>{
						if(rows.length>0) console.log('đã có thêm bạn rồi');
						else{
							con.query(add,[req.session.user.userId,friendId],(err)=>{
								if(err) console.log(err);
							});
							con.query(add,[friendId,req.session.user.userId],(err)=>{
								if(err) console.log(err);
							});

							var roomName=req.session.user.userId+'-'+friendId;
							con.query(addRoom,[roomName,2]);
							con.query(addUserRoom,[req.session.user.userId,roomName,friendId,roomName]);
						}
					});
					con.release();
				});								
			}else{
				console.log('ko thể thêm bạn với chính mình');
			}
		});
	});
	app.get('/addFriends',(req,res)=>{
		// var getListSql='SELECT * FROM USER JOIN friends ON user_id=currentUser WHERE user_id=?';
		var testSql='select * from user where user_id in(select frienduser from friends where currentuser=?)';
		conn.aquire((err,conn)=>{
			conn.query(testSql,[req.session.user.userId],(err,rows)=>{
				res.send(rows);
				console.log(rows);
			});
			conn.release();
		});
	});
}