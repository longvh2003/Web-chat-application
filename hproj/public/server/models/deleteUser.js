var con=require('./connection');
module.exports = (app,fs)=>{
	app.post('/deleteUser',(req,res)=>{
		con.aquire((err,con)=>{
			con.query('delete from user where user_id = ?',[req.body.user_id]);
			
		});
		// fs.unlink('userAvatar/'+req.body.user_id+'.jpg');
		// fs.unlinkSync('C:/Users/L/Desktop/Web-chat-application/hproj/public/userAvatar'+req.body.user_id+'.jpg');
	});
}
