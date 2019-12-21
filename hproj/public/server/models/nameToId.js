import con from './connection';

module.exports=app=>{
	app.post('/nameToId',(req,res)=>{
		con.aquire((err,con)=>{
			con.query('select user_id from user where username=?',[req.body.username],(err,rows)=>{
				res.send(rows);
			});
		});
	});
}