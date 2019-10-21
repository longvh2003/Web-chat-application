var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mysql=require('mysql');
var connection=mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test'
});
var regform = require('./regform');

connection.connect(err=>{
	if(err) console.log(err);
	else console.log('connect success to database');
});


app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.render('loginForm');
});

regform(app, connection);
// app.use(express.urlencoded());
app.post('/home',function(req,res){
	console.log('email: '+req.body.email+' password: '+req.body.pass);

		connection.query('SELECT * FROM User WHERE Email = ? and Pass= ? ',[req.body.email,req.body.pass],function(err,rows){
		if(err) console.log(err);
		if(rows.length > 0) {
			res.render('home');
			console.log('success');
		} else {
			res.redirect('/');
			
		}
			console.log(rows);
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