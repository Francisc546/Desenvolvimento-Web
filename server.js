var express = require('express');
var bodyParser = require('body-parser');
var mongoConfigs = require('./model/mongoConfigs');
var RegistoController = require('./controller/RegistoController');
var LoginController = require('./controller/LoginController');
var url = require('url');
var ejs = require('ejs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+'_'+file.originalname)
    }
})
var upload = multer({storage})

var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();

app.use(urlencodedParser);
app.set('view engine', 'ejs');

app.use(express.static('uploads'))
app.use('/uploads',express.static('uploads'))
app.use(express.static('css'))

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
app.post('/registado', upload.single('img'),function (req, res) {
    //We are using the body-parser so req.body.[name in form will be available]
    RegistoController.addRegisto(req, function (err,result,estado) {
       res.render('./registar/registado',{data:estado});
    });
    console.log(req.body,req.file)
    global.globalString=req.file.path;

});

app.post('/logado', function (req, res) {
    //We are using the body-parser so req.body.[name in form will be available]
    LoginController.confirmarLogin(req, function (err,result,estado) {
        res.render('./login/logado',{data:estado});
    });
});