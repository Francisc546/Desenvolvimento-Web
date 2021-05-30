const Conversa = require('../model/Conversa');

function CriarConversa(req,callback){
    Conversa.CriarConversa(req.body.conversa,callback);
}
function ListarConversas(callback){
    Conversa.ListarConversas(callback);
}
function ListarPessoas(callback){
    Conversa.ListarPessoas(callback);
}
function EditarConversa(req,callback){
    Conversa.EditarConversa(req.body.nome,callback);
}
function ApagarConversa(req,callback){
    Conversa.ApagarConversa(req,callback);
}
module.exports = {
    CriarConversa,
    ListarConversas,
    ListarPessoas,
    EditarConversa,
    ApagarConversa,

};