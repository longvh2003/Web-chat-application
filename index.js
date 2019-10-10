var express=require('express');
var app=express();

app.set('view engine','pug');
app.set('views','./views');

app.get('/',function(req,res){
	res.render('index');
});

var server=app.listen(3000,()=>{console.log('running...');});

var socket=require('socket.io');
var io = socket(server);

io.on('connection',function(socket){
	console.log('connected');
	socket.on('sendbackserver',function(data){
		console.log('nhan data thanh cong');
		io.sockets.emit('sendtoclients',data);
	});
});