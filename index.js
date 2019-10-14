var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'chat'
});

connection.connect(err=>{
	if(err) console.log(err);
	else console.log('connect success to database');
});


app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.render('loginForm');
});

app.post('/user',function(req,res){
	console.log('password: '+req.body.username+' password: '+req.body.password);

	connection.query('SELECT * FROM customer WHERE user_name = ? and password= ? ',[req.body.username,req.body.password],function(err,rows){
		if(err) console.log(err);
		if(rows.length===1) {
			res.render('joinForm');
		}
	});
});

app.post('/user/chat-room',function(req,res){
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