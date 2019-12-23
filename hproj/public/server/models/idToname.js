import con from './connection';

module.exports=app=>{
	app.post('/idToname',(req,res)=>{
		con.aquire((err,con)=>{
			con.query('select username from user where user_id=?',[req.body.user_id],(err,rows)=>{
				res.send(rows);
			});
			con.release();
		});
	});
}