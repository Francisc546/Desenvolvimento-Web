var mongoConfigs = require('./mongoConfigs');
var ObjectId = require('mongodb').ObjectId;

function CriarMensagem(mensagem,id_conversa,callback){
    var db = mongoConfigs.getDB();
    const unixTimestamp = Date.now();
    const dateObj = new Date(unixTimestamp);
    const ano =dateObj.getFullYear();
    const mes =dateObj.getMonth()+1;
    const dia=dateObj.getDate();
    const hora=dateObj.getHours().toString().padStart(2,);
    const minutos=dateObj.getMinutes().toString().padStart(2,0);
    const segundos=dateObj.getSeconds().toString().padStart(2,0);
    const data_final=hora+":"+minutos+":"+segundos+" "+dia+"/"+mes+"/"+ano;
    db.collection('mensagens').insertOne({mensagem:mensagem,conversa:id_conversa,utilizador:id_user,data:data_final,nome_utilizador:nome_user,foto_utilizador:foto_user},function(err,result){
        callback(err,result);
    });
}

function ListarMensagens(id_conversa,callback){
    var db = mongoConfigs.getDB();
    global.id_conversa=id_conversa;
    db.collection('mensagens').find({conversa:id_conversa}).toArray(function(err,result){
        db.collection('conversas').find({_id:ObjectId(id_conversa)}).toArray(function(err,result2) {
            callback(result,result2[0].chat_name,result2[0].criador);
        });
    });

}


function ResponderMensagem(id_mensagem,callback){
    var db = mongoConfigs.getDB();
    global.id_mensagem=id_mensagem;

    db.collection('mensagens').find({_id:id_mensagem}).toArray(function(err,result){
        //callback(result.nome_utilizador,result.mensagem,result.data);
        callback(result);
    });
}

function RespostaMensagem(resposta,mensagem,id_conversa,callback){
    var db = mongoConfigs.getDB();
    const unixTimestamp = Date.now();
    const dateObj = new Date(unixTimestamp);
    const ano =dateObj.getFullYear();
    const mes =dateObj.getMonth()+1;
    const dia=dateObj.getDate();
    const hora=dateObj.getHours().toString().padStart(2,);
    const minutos=dateObj.getMinutes().toString().padStart(2,0);
    const segundos=dateObj.getSeconds().toString().padStart(2,0);
    const data_final=hora+":"+minutos+":"+segundos+" "+dia+"/"+mes+"/"+ano;
    db.collection('mensagens').insertOne({resposta:resposta,mensagem:mensagem,conversa:id_conversa,utilizador:id_user,data:data_final,nome_utilizador:nome_user,foto_utilizador:foto_user},function(err,result){
        callback(err,result);
    });
}


function PartilharMensagem(id_mensagem,callback){
    var db = mongoConfigs.getDB();
    global.id_mensagem=id_mensagem;
    console.log(id_mensagem+ "1º");
    db.collection('mensagens').find({_id:ObjectId(id_mensagem)}).toArray(function(err,result){
        //callback(result.nome_utilizador,result.mensagem,result.data);//
        console.log(id_mensagem+ "2º");
        console.log(result);
        callback(result);
    });
}



module.exports = {
    ListarMensagens,
    CriarMensagem,
    PartilharMensagem,
    ResponderMensagem,
    RespostaMensagem
};