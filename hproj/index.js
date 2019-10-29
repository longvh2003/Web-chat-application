import express from 'express';
import validate from './public/server/models/validatepassword';
import msgdb from './public/server/models/msgDB';
import session from 'express-session';
import getHis from './public/server/models/getChatroomHistory';
const port = 3000;
import bodyParser from 'body-parser';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(session({secret: 'ssshhhhh'}));
app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'html')

app.get('/',function(req, res){
    console.log(req.session.user);
    if(req.session.user){
        res.redirect('/home')
    } else{
        res.sendFile(__dirname + '/public/src/index.html');
    }
});

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/public/src/chatForm.html');
})


app.get('/home/messageHis', (req, res) => {
    getHis(function (err, result) {
        if (err) console.log("Database error!");
        else res.send(result);
      });

})

app.get('/home/username', (req, res)=>{
    console.log(req.session.user);
    res.send(req.session.user);
})

app.get('/chat.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/chat.js');
})

app.use(bodyParser.urlencoded({ extended: true }));
validate(app);

io.sockets.on('connection', function(socket){
    socket.on('message', (msg) =>{
        msgdb(msg);
        io.emit('message', msg)
        console.log(msg);
    })
});

const server = http.listen(port, function(){
    console.log("listening on 3000");
})

