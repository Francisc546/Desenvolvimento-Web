var express = require('express');
var bodyParser = require('body-parser');
var mongoConfigs = require('./model/mongoConfigs');
var RegistoController = require('./controller/RegistoController');
var LoginController = require('./controller/LoginController');
var EditarController = require('./controller/EditarController');
var ConversaController = require('./controller/ConversaController');
var MensagemController = require('./controller/MensagemController');
var ConvitesController = require('./controller/ConvitesController');
var url = require('url');
var ejs = require('ejs');
//o multer é usado para armazenar as fotos de perfil
var multer = require('multer');
const { data } = require('jquery');
/*aqui estamos a fazer o armazenamento, criando a pasta do destino onde ficaram as fotos guardadas e
 estamos a atribuir o nome a foto, que neste caso vai ser a data do momento é que a foto é carrega
 seguido de "_" seguido do nome original da foto*/
var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+'_'+file.originalname)
    }
})
//estamos a guardar a informaçao do upload nesta variavel
var upload = multer({storage})
var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();
app.use(urlencodedParser);
app.set('view engine', 'ejs');
app.use(express.static('uploads'))
app.use('/uploads',express.static('uploads'))
app.use(express.static('css'))
app.use(express.static('js'))
mongoConfigs.connect(function(err){
    if(!err){
        app.listen(3000,function(){
            console.log("Express web server listening on port 3000");
        });
    }
});
app.get('/',function (req, res) {
    res.render('./login/login');
});
app.get('/registar',function (req, res) {
    res.render('./registar/registar');
});
app.get('/editar',function (req, res) {
    res.render('./editar/editar');
});
app.get('/pedirVoltar',function (req, res) {
    ConvitesController.ListarPedidosVoltar( function (result) {
        res.render('./convites/pedirVoltar',{data:result});
    });
});
app.get('/pedidos',function (req, res) {
    ConvitesController.ListarPedidosAceitar( function (result) {
        res.render('./pedidos/pedidos',{data:result});
    });
});
app.get('/convites',function (req, res) {
    ConvitesController.ListarConvites( function (result) {
        res.render('./convites/convites',{data:result} );
    });
});
app.get('/criarConversa',function (req, res) {
    ConversaController.CriarConversa(req, function (err,result) {
        res.render('./login/login');
    });
});
app.get('/alteracoes',function (req, res) {
    res.render('./definicoesConversa/definicoesConversa');
});
app.get('/pedidos',function (req, res) {   /*FALTA FAZER O EJS PARA ESTE*/
    res.render('./conversa/conversa');
});
app.get('/voltar',function (req, res) {

    res.render('./login/login');
});
app.get('/sair',function (req, res) {
    res.render('./login/login');
});
app.get('/pedidos',function (req, res) {
    res.render('./pedidos/pedidos');
});
app.get('/adicionar',function (req, res) {
    ConversaController.ListarPessoas(function (err,result,estado){
        estado.pessoas=result;
        res.render('./adicionarPessoa/adicionarPessoa',{data:estado});
    });
});
app.post('/aceitar',function (req, res) {
    ConvitesController.AceitarConvite( req,function (result) {
        res.render('./login/login', );

    });
});
app.post('/recusar',function (req, res) {
    ConvitesController.RecusarConvite(req, function (result) {
        res.render('./login/login', );

    });
});
app.post('/aceitarPedido',function (req, res) {
    ConvitesController.AceitarConviteVolta( req,function (result) {
        res.render('./login/login', );
    });
});
app.post('/recusarPedido',function (req, res) {
    ConvitesController.RecusarConviteVolta(req, function (result) {
        res.render('./login/login', );
    });
});
app.post('/apagar',function (req, res) {
    ConversaController.ApagarConversa(req, function (result) {
        res.render('./login/login', );

    });
});
app.post('/abandonarConversa',function (req, res) {
    ConvitesController.AbandonarConversa(req, function (result) {
        res.render('./login/login', );
    });
});
app.post('/pedirVoltar',function (req, res) {
    ConvitesController.PedirVoltar(req, function (result) {
        res.render('./login/login', );

    });
});
app.post('/adicionarPessoa',function (req, res) {
    ConvitesController.CriarParticipante(req, function (result) {
        res.render('./login/login' );

    });
});
app.post('/conversa',function (req, res) {
    MensagemController.ListarMensagens(req, function (result,nome_conversa,criador) {
        res.render('./conversa/conversa', {data:{mensagens:result,id_conversa:req.body.chat,nome_user:nome_user,chat_name:nome_conversa,criador:criador}});
    });
});
app.post('/enviar',function (req, res) {
    MensagemController.CriarMensagem(req, function (err,result) {
        res.render('./login/login' );
    });
});
app.post('/registado', upload.single('img'),function (req, res) {
    RegistoController.addRegisto(req, function (err,result,estado) {
       res.render('./registar/registado',{data:estado});
    });
    console.log(req.body,req.file)
    global.caminho=req.file.path;

});
app.post('/editado_nome', upload.single('img'),function (req, res) {
    EditarController.editarNome(req, function (err,result,estado) {
        res.render('./editar/editado_nome',{data:estado});
    });
});
app.post('/editado_pass', upload.single('img'),function (req, res) {
    EditarController.editarPassword(req, function (err,result,estado) {
        res.render('./editar/editado_pass',{data:estado});
   });
});
app.post('/editado_foto', upload.single('img'),function (req, res) {
    EditarController.editarFoto(req, function (err,result,estado) {
         res.render('./editar/editado_foto',{data:estado});
     });
    console.log(req.body,req.file)
    global.caminho_editar=req.file.path;
});
app.post('/perfil', function (req, res) {
    //We are using the body-parser so req.body.[name in form will be available]
    LoginController.confirmarLogin(req, function (err,result,estado) {
        ConversaController.ListarConversas(function (result,result2){
            estado.conversas=result;
            estado.conversas_participadas=result2;
            res.render('./login/perfil',{data:estado});
        });
    });
});






app.post('/responderMensagem',function (req, res) {
    MensagemController.ResponderMensagem(req, function (err,result, estado) {
        estado.mensagem = result;
        res.render('./conversa/responderMensagem', {data:estado});
    });
});


app.post('/respostaMensagem',function (req, res) {
    MensagemController.RespostaMensagem(req, function (err,result, estado) {
        estado.mensagem = result;
        res.render('./login/login', {data:estado});
    });
});



app.post('/partilharMensagem',function (req, res) {
        ConversaController.ListarConversas(function (err,result,estado) {
            MensagemController.PartilharMensagem(req, function (result2) {
                estado.conversas_participadas = result;
                estado.mensagem_partilhada = result2;
                //res.render('./conversa/partilharMensagem',{data:result}); //mudar render para o partilharmensagem ejs
                res.render('./conversa/partilharMensagem', {data: {mensagem_partilhada: result, conversas_participadas: result2}}); //mudar render para o partilharmensagem ejs
            });
        });
});


/*
var express = require('express');
var user = require('../controllers/user.js'); /*Verificar se estes caminhos estão corretos*/
/*var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();

router
  .get('/', chatRoom.getRecentConversation)
  .get('/:roomId', chatRoom.getConversationByRoomId)
  .post('/initiate', chatRoom.initiate)
  .post('/:roomId/message', chatRoom.postMessage)
  .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)


module.exports = router; */



