import express from 'express';
var router = express.Router();





router.get('/node_modules/angular-ui-notification/dist/angular-ui-notification.min.css', (req, res)=>{
    res.sendFile(__dirname + '/node_modules/angular-ui-notification/dist/angular-ui-notification.min.css');
})

router.get('/node_modules/angular-ui-notification/dist/angular-ui-notification.min.js', (req, res)=>{
    res.sendFile(__dirname + '/node_modules/angular-ui-notification/dist/angular-ui-notification.min.js');
})



module.exports = router;