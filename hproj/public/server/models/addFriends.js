var conn=require('./connection');
module.exports=app=>{
	app.post('/addFriends',(req,res)=>{
		var getFriendIdSql='SELECT * FROM user WHERE username=?';
		var add='INSERT INTO friends(currentUser,friendUser,chatroomname) values(?,?,?)';
		
		var addRoom='INSERT INTO chatroom(chatroom_name, member_num) VALUES (?,?)';
		var addUserRoom='INSERT INTO userchatroom VALUES (?,?),(?,?)';

		var addInvi= 'INSERT INTO invitation(user1,user2) value(?,?)';

		if(!req.body.username){
			res.send('nhap vao');
		}else{
			conn.aquire((err,con)=>{
			if(req.body.username!=req.session.user.username){
				con.query(getFriendIdSql,req.body.username,(err,rows)=>{
					if(err) console.log('khong tim thay userfriend');
					var friendId=rows[0].user_id;
					con.query('select * from friends where currentUser=? and friendUser=?',[req.session.user.userId,friendId],(err,rows)=>{
						if(rows.length>0) res.send('đã có thêm bạn rồi');
						else{
							con.query(addInvi,[req.session.user.userId,friendId],err=>{
								res.send('Gửi lời mời kết bạn thành công');
							});
						}
					});
				});								
			}else{
				res.send('ko thể thêm bạn với chính mình');
			}
			con.release();
		});
		}
	});
	app.get('/addFriends',(req,res)=>{
		// var getListSql='SELECT * FROM USER JOIN friends ON user_id=currentUser WHERE user_id=?';
		var testSql='select user.user_id,user.username,f.chatroomname,chatroom.chatroom_id from friends f  join user on user.user_id=f.frienduser  join chatroom on f.chatroomname=chatroom.chatroom_name where currentuser=?';
		conn.aquire((err,conn)=>{
			conn.query(testSql,[req.session.user.userId],(err,rows)=>{
				res.send(rows);
				console.log(rows);
			});
			conn.release();
		});
	});
}
