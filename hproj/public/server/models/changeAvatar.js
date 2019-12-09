module.exports=(app)=>{
	app.get('/changeAvatar',(req,res)=>{
		res.sendFile(__dirname+'/public/src/component/changeAvatar.html');
	});
}