var mongoConfigs = require('./mongoConfigs');


function CriarConversa(nome,callback){
    var db = mongoConfigs.getDB();
    db.collection('conversas').insertOne({chat_name:nome,criador:id_user},function(err,result){
        callback(err,result);
    });
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
    db.collection('conversas').updateOne({_id:ObjectId(id_conversa)}, {$set: {chat_name:nome}},function(err,result){
        estado.sucesso=true;
        estado.mensagem=("Nome da conversa editado com sucesso!");
        console.log("Nome da conversa editado com sucesso!");
        callback(err,result,estado);
    });
}


module.exports = {
    CriarConversa,
    ListarConversas,
    ListarPessoas,
    EditarConversa,
    ApagarConversa
};