module.exports = app =>{
	app.post('/AuthenticAdmin',(req,res)=>{
		res.send(req.session.user.username==='admin');
	})
}