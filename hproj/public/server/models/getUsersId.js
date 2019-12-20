var conn = require('./connection');
module.exports = app=>{
	app.get('/getUsersId',(req,res)=>{
		conn.aquire((err, con) =>{
            con.query('select user_id,username from user', (err, result) =>{
                res.send(result);
            })
            con.release();
        });

	});
}