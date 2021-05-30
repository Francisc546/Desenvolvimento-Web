const Conversa = require('../model/Conversa');

function CriarConversa(req,callback){
    const unixTimestamp = Date.now();
    const dateObj = new Date(unixTimestamp);
    const ano =dateObj.getFullYear();
    const mes =dateObj.getMonth()+1;
    const dia=dateObj.getDate();
    const hora=dateObj.getHours().toString().padStart(2,);
    const minutos=dateObj.getMinutes().toString().padStart(2,0);
    const segundos=dateObj.getSeconds().toString().padStart(2,0);
    const data_final=hora+":"+minutos+":"+segundos+" "+dia+"/"+mes+"/"+ano;
    Conversa.CriarConversa(data_final,callback);
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