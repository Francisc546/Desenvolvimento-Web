const Editar = require('../model/Editar');

function editarNome(req,callback){
    Editar.editarNome(req.body.nome,callback);
}

function editarPassword(req,callback){
    Editar.editarPassword(req.body.password,callback);
}
function editarFoto(req,callback){
    Editar.editarFoto(req.body.foto,callback);
}
module.exports = {
    editarNome,
    editarPassword,
    editarFoto
};
