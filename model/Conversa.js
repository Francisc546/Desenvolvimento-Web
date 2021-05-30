var mongoConfigs = require('./mongoConfigs');
var mongoose = require('mongoose');

function CriarConversa(nome,callback){
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

    if (nome == "") //if it does
    {
        db.collection('conversas').insertOne({chat_name:data_final, criador:id_user},function(err,result){
            callback(err,result);
        });
    }
    else // if it does not
    {
        db.collection('conversas').insertOne({chat_name:nome, criador:id_user},function(err,result){
            callback(err,result);
        });


    }

}
function ListarConversas(callback){
    var db = mongoConfigs.getDB();
    db.collection('conversas').find({criador:id_user}).toArray(function(err,result){
        db.collection('participantes').find({id_user:global.id_user,aceite:1}).toArray(function(err,result2){
            callback(result,result2);
        });
    });
}
function ApagarConversa(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('conversas').deleteOne( {chat_name:req.body.chat_name});
    db.collection('participantes').deleteMany( { id_conversa  : req.body.id_conversa});
    db.collection('mensagens').deleteMany( { conversa  : req.body.id_conversa});
    callback("apagada");

}
function ListarPessoas(callback){
    var db = mongoConfigs.getDB();
    var estado = {};
    db.collection('registo_contas').find({ativo:1}).toArray(function(err,result){
        callback(err,result,estado);
    });
}

function EditarConversa(nome,callback){
    var db = mongoConfigs.getDB();
    var estado={};
    var id_obj = mongoose.Types.ObjectId(id_conversa);
    db.collection('conversas').updateOne({_id:id_obj}, {$set: {chat_name:nome}},function(err,result){
        estado.sucesso=true;
        estado.mensagem=("Nome da conversa editado com sucesso!");
        console.log("Nome da conversa editado com sucesso!");
        callback(err,result,estado);
    });
    db.collection('participantes').updateMany({id_conversa:id_conversa}, {$set: {conversa:nome}});

}

module.exports = {
    CriarConversa,
    ListarConversas,
    ListarPessoas,
    EditarConversa,
    ApagarConversa
};