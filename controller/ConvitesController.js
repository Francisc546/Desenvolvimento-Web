const Convites = require('../model/Convites');

function CriarParticipante(req,callback){
    Convites.CriarParticipante(req.body.nome,callback);
}
function ListarConvites(callback){
    Convites.ListarConvites(callback);
}
function AceitarConvite(req,callback){
   Convites.AceitarConvite(req,callback);

}
function RecusarConvite(req,callback){
    Convites.RecusarConvite(req,callback);
}
function AbandonarConversa(req,callback){
    Convites.AbandonarConversa(req,callback);
}
function ListarPedidosVoltar(callback){
    Convites.ListarPedidosVoltar(callback);
}
function ListarPedidosAceitar(callback){
    Convites.ListarPedidosAceitar(callback);
}
function PedirVoltar(req,callback){
    Convites.PedirVoltar(req,callback);
}
function AceitarConviteVolta(req,callback){
    Convites.AceitarConviteVolta(req,callback);

}
function RecusarConviteVolta(req,callback){
    Convites.RecusarConviteVolta(req,callback);
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