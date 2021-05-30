const Mensagem = require('../model/Mensagem');

function ListarMensagens(req,callback){
  Mensagem.ListarMensagens(req.body.chat,callback);
}
function CriarMensagem(req,callback){
    Mensagem.CriarMensagem(req.body.mensagem,req.body.id_conversa,callback);
}

function PartilharMensagem(req,callback){
    Mensagem.PartilharMensagem(req.body.id_mensagem,callback);
}
function ResponderMensagem(req,callback){
    Mensagem.ResponderMensagem(req.body.id_mensagem,callback);
}

function RespostaMensagem(req,callback){
    Mensagem.RespostaMensagem(req.body.resposta,req.body.mensagem,req.body.id_conversa,callback);
}
module.exports = {
    ListarMensagens,
    CriarMensagem,
    PartilharMensagem,
    ResponderMensagem,
    RespostaMensagem

};