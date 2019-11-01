import express from 'express';
import validate from './public/server/models/validatepassword';  //Xác  thực đăng nhập
import msgdb from './public/server/models/msgDB';  //Thêm tin nhắn vào DB
import session from 'express-session';
import getHis from './public/server/models/getChatroomHistory';  //Lấy tin nhắn cũ
const port = 3000;
import bodyParser from 'body-parser';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


/* Dùng Middleware session, static file, view engine(có thể không cần (chưa test)) */
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'html')

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
    res.sendFile(__dirname + '/public/src/chatForm.html');
})

/* Lấy tin nhắn cũ */
app.get('/home/messageHis', (req, res) => {
    getHis(function (err, result) {
        if (err) console.log("Database error!");
        else res.send(result);
      });

})

/* Gửi username cho client */
app.get('/home/username', (req, res)=>{
    console.log(req.session.user);
    res.send(req.session.user);
})

/* Gửi file chat.js khi chatForm được render (AngularJS) */
app.get('/chat.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/chat.js');
})

app.use(bodyParser.urlencoded({ extended: true }));
validate(app);


/* Xác nhận khi đăng nhập thành công */
// io.sockets.on('connection', function(socket){
//     socket.on('message', (msg) =>{
//         msgdb(msg);
//         io.emit('message', msg)
//         console.log(msg);
//     })
// });

const nsp = io.of('/home');
nsp.on('connection', function(socket){
  console.log('someone connected');
});
nsp.on('message', (socket)=>{
    msgdb(msg);
    nsp.emit('message', msg);
    console.log('Reicived');
})

const room1 = io.of('/home/1');
room1.on('connection', (socket)=>{
    console.log('entering room');
    socket.on('message', (msg)=>{   
        console.log('recived');
        msgdb(msg);
        room1.emit('message', msg);
    })
})


/* Mở cổng */
const server = http.listen(port, function(){
    console.log("listening on 3000");
})

