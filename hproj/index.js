import express from 'express';
import validate from './public/server/models/validatepassword';  //Xác  thực đăng nhập
import msgdb from './public/server/models/msgDB';  //Thêm tin nhắn vào DB
import session from 'express-session';
import getHis from './public/server/models/getChatroomHistory';  //Lấy tin nhắn cũ
import getChatroom from './public/server/models/getRoomId';
import getListFriend from './public/server/models/getListFriend';
import addChatroom from './public/server/models/addRoom';
import notification from './public/server/models/notification';
import getNotifi from './public/server/models/getNotifi';
import deleteRoom from './public/server/models/deleteRoom';
var angularRouter = require('./angularRoute')
var getListInvi=require('./public/server/models/getListInvi');
var register=require('./public/server/models/register');
var addFriends=require('./public/server/models/addFriends');
var markInvi=require('./public/server/models/markInvi');
const port = 3000;
import bodyParser from 'body-parser';
import { restElement } from 'babel-types';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


/* Dùng Middleware session, static file, view engine(có thể không cần (chưa test)) */
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static('public'));
app.use(express.static('public/content/icon'));
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
getListInvi(app);
markInvi(app);


/* Lấy tin nhắn cũ */
app.get('/home/messageHis/:roomid', (req, res) => {
    getHis(req.params.roomid ,function (err, result) {
        if (err) console.log("Database error!");
        else res.send(result);
      });
})

app.get('/getNotifi/:userid', (req, res)=>{
    getNotifi(req.params.userid, function(err, result) {
        console.log(result);
        res.send(result);
    })
})
/* Gửi username cho client */
app.get('/home/username', (req, res)=>{
    getChatroom(req.session.user.userId, function (err, result){
        res.send({userdata:req.session.user, chatroom: result});
    }); 
})
app.use('/', angularRouter);
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

app.post('/getFriendsInfo/:userid', (req, res)=>{
    getListFriend(req.params.userid, (err, result)=>{
        if(err) res.send({status:false});
        else res.send(result);
    })
})

app.post('/addNotifi', (req, res)=>{
    notification.addRoomInviteNotification(req.body, (err)=>{
        if(err) res.send({status:false});
        else res.send({status:true}); 
    })
})

app.post('/home/deleteRoom/:roomid', (req, res)=>{
    deleteRoom(req.params.roomid);
    res.send('1');
})

validate(app);


const room = io.of('/home');
room.on('connection', (socket)=>{
    socket.on('join', function(roomid){
        socket.join(roomid);
        room.in(roomid).clients((err, clients)=>{
            room.to(roomid).emit('usernumber', clients, roomid)
        })
        //room.to(roomid).emit('userjoin', roomid);
    })
    socket.on('message', function (msg){
        msgdb(msg);
        notification.addMessageNotification(msg);
        room.to(msg.roomid).emit('message', msg);
    })
})

/* Mở cổng */
const server = http.listen(port, function(){
    console.log("listening on 3000");
})

