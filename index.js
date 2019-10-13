var express=require('express');
var app=express();
var bodyParser=require('body-parser');

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.render('joinForm');
});

app.post('/chat-room',function(req,res){
	res.render('index',{
		dsa:req.body.asd
	});
});

var server=app.listen(3000,()=>{console.log('running...');});

var socket=require('socket.io');
var io = socket(server);

io.on('connection',function(socket){
	console.log('connected');
	socket.on('room',data=>{
		socket.join(data);
	});
	socket.on('sendbackserver',function(data){
		console.log('nhan data thanh cong');
		io.sockets.in(data.roomNumber).emit('sendtoclients',data);
	});
});