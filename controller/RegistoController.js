const Registar = require('../model/Registar');

function addRegisto(req,callback){
    Registar.inserirRegisto(req.body.nome,req.body.password,callback);
}

module.exports = {
    addRegisto,
};
