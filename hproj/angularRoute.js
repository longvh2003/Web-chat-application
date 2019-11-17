import express from 'express';
var router = express.Router();

router.get('/chat.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/chat.js');
})

router.get('/app.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/app.js');
})

router.get('/headerCtrl.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/headerCtrl.js');
})

router.get('/menuCtrl.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/menuCtrl.js');
})

router.get('/DialogAddController.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/DialogAddController.js');
})

router.get('/DialogInviteController.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/DialogInviteController.js');
})



router.get('/node_modules/angular-ui-notification/dist/angular-ui-notification.min.css', (req, res)=>{
    res.sendFile(__dirname + '/node_modules/angular-ui-notification/dist/angular-ui-notification.min.css');
})

router.get('/node_modules/angular-ui-notification/dist/angular-ui-notification.min.js', (req, res)=>{
    res.sendFile(__dirname + '/node_modules/angular-ui-notification/dist/angular-ui-notification.min.js');
})


router.get('/public/content/icon/delete.svg', (req, res)=>{
    res.sendFile(__dirname + '/public/content/icon/delete.svg')
})

router.get('/public/content/icon/plus.svg', (req, res)=>{
    res.sendFile(__dirname + '/public/content/icon/plus.svg')
})


router.get('/contentCtrl.js', (req, res)=>{
    res.sendFile(__dirname + '/public/src/contentCtrl.js');
})

module.exports = router;