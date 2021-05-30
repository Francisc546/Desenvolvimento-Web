var mongoConfigs = require('./mongoConfigs');
var ObjectId = require('mongodb').ObjectId;

function CriarParticipante(nome,callback){
    var db = mongoConfigs.getDB();
    db.collection('registo_contas').find({nome:nome}).toArray(function(err,result){
        db.collection('conversas').find({_id:ObjectId(global.id_conversa)}).toArray(function(err,result2){
            console.log(result2);
            db.collection('participantes').insertOne({id_user:result[0]._id.toString(),id_conversa:global.id_conversa,aceite:0,conversa:result2[0].chat_name,nome_participante:result[0].nome,id_admin:id_user},function(err,result){
                callback(err,result);

            });
        });
    });
}


function ListarConvites(callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').find({id_user:global.id_user,aceite:0}).toArray(function(err,result){
        callback(result);
    });
}
function ListarPedidosVoltar(callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').find({id_user:global.id_user,aceite:2}).toArray(function(err,result){
        callback(result);
    });
}
function ListarPedidosAceitar(callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').find({id_admin:global.id_user,aceite:3}).toArray(function(err,result){
        callback(result);
    });
}
function AceitarConviteVolta(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').updateOne({id_admin:global.id_user,aceite:3,id_conversa:req.body.id_conversa}, {$set: {aceite:1}});
    callback("aceite");
}
function RecusarConviteVolta(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').deleteOne({id_admin:global.id_user,aceite:3,id_conversa:req.body.id_conversa});
    callback("recusado");
}
function AceitarConvite(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').updateOne({id_user:global.id_user,aceite:0,id_conversa:req.body.id_conversa}, {$set: {aceite:1}});
    callback("aceite");

}
function RecusarConvite(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').deleteOne( {id_user:global.id_user,aceite:0,id_conversa:req.body.id_conversa});
    callback("recusado");
}

function AbandonarConversa(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').updateOne({id_user:global.id_user,aceite:1,id_conversa:id_conversa},{$set: {aceite:2}});
    callback("abandonou");
}
function PedirVoltar(req,callback){
    var db = mongoConfigs.getDB();
    db.collection('participantes').updateOne({id_user:global.id_user,aceite:2,id_conversa:id_conversa},{$set: {aceite:3}});
    callback("pediu");
}


module.exports = {
    CriarParticipante,
    ListarConvites,
    AceitarConvite,
    RecusarConvite,
    AbandonarConversa,
    ListarPedidosVoltar,
    PedirVoltar,
    ListarPedidosAceitar,
    AceitarConviteVolta,
    RecusarConviteVolta

};