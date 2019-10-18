module.exports = function(app,conn){
	app.route('/home').post((req,res)=>{
		var value = req.body.email;
		conn.query('INSER INTO Friends ')
	});
}