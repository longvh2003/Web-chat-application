import express from 'express';
import validate from './public/server/models/validatepassword';  //Xác  thực đăng nhập
import msgdb from './public/server/models/msgDB';  //Thêm tin nhắn vào DB
import session from 'express-session';
import getHis from './public/server/models/getChatroomHistory';  //Lấy tin nhắn cũ
import getChatroom from './public/server/models/getRoomId';
import addChatroom from './public/server/models/addRoom';
var register=require('./public/server/models/register');
var addFriends=require('./public/server/models/addFriends');
const port = 3000;
import bodyParser from 'body-parser';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


/* Dùng Middleware session, static file, view engine(có thể không cần (chưa test)) */
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static('public'));
app.set('views', __dirname + '/public/src');
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())



/* Redirect tới home nếu đăng nhập rồi, tới login nếu chưa */
app.get('/',function(req, res){
    console.log(req.session.user);
    if(req.session.user){
        res.redirect('/home')
    } else{
        res.sendFile(__dirname + '/public/src/index.html');
    }
});

/* Render chatForm nếu request tới home */
app.get('/home', function(req, res){
    if(req.session.user)
    res.sendFile(__dirname + '/public/src/chatForm.html');
    else res.redirect('/');
})

register(app);
addFriends(app);


/* Lấy tin nhắn cũ */
app.get('/home/messageHis/:roomid', (req, res) => {
    getHis(req.params.roomid ,function (err, result) {
        if (err) console.log("Database error!");
        else res.send(result);
      });
})

/* Gửi username cho client */
app.get('/home/username', (req, res)=>{
    getChatroom(req.session.user.userId, function (err, result){
        res.send({userdata:req.session.user, chatroom: result});
    }); 
})

/* Gửi file chat.js khi chatForm được render (AngularJS) */
app.get('/chat.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/chat.js');
})

app.get('/app.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/app.js');
})

app.get('/headerCtrl.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/headerCtrl.js');
})

app.get('/menuCtrl.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/menuCtrl.js');
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        console.log('user logged out');
    });
    res.redirect('/');
    
});

app.post('/home/addRoom', (req, res)=>{
    console.log(req.body);
    addChatroom(req.body, function(err){
        //console.log(err.code);
        if(err) res.send({status:false});
        else res.send({status:true});
    });
})

validate(app);


const room = io.of('/home');
room.on('connection', (socket)=>{
    socket.on('join', function(roomid){
        socket.join(roomid);
    })
    socket.on('message', function (msg){   
        console.log(msg);
        msgdb(msg);
        room.to(msg.roomid).emit('message', msg);
    })
})

/* Mở cổng */
const server = http.listen(port, function(){
    console.log("listening on 3000");
})

