var express = require('express');
var bodyParser = require('body-parser');
var mongoConfigs = require('./model/mongoConfigs');
var RegistoController = require('./controller/RegistoController');
var LoginController = require('./controller/LoginController');
var url = require('url');
var ejs = require('ejs');

var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();

app.use(urlencodedParser);
app.set('view engine', 'ejs');

mongoConfigs.connect(function(err){
    if(!err){
        app.listen(3000,function(){
            console.log("Express web server listening on port 3000");
        });
    }
});

app.get('/login',function (req, res) {
    res.render('./login/login');
});
app.get('/registar',function (req, res) {
    res.render('./registar/registar');
});

app.post('/registado', function (req, res) {
    //We are using the body-parser so req.body.[name in form will be available]
    RegistoController.addRegisto(req, function (err,result,estado) {
       res.render('./registar/registado',{data:estado});
    });
});
app.post('/logado', function (req, res) {
    //We are using the body-parser so req.body.[name in form will be available]
    LoginController.confirmarLogin(req, function (err,result,estado) {
        res.render('./login/logado',{data:estado});
    });
});