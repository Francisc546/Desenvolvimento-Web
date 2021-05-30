var mongoConfigs = require('./mongoConfigs');

function editarNome(nome,callback){
    var db = mongoConfigs.getDB();
    db.collection("registo_contas").find({ nome:nome}, { $exists: true }).toArray(function    (err, doc) //find if a value exists
    {   var estado={};
        if (doc && doc.length) //if it does
        {
            estado.sucesso=false;
            estado.mensagem="Já existe uma conta com o seguinte nome: "+ nome;
            console.log(doc,"Já existe uma conta com o seguinte nome: "+ nome);
            callback(err,doc,estado);

        }else // if it does not
        {
            db.collection('registo_contas').updateOne({nome: nome_user}, {$set: {nome: nome}}, function (err, result) {
                estado.sucesso=true;
                estado.mensagem = ("Nome editado com sucesso: " + nome);
                console.log("Nome editado com sucesso: " + nome);
                callback(err, result, estado);
            });
        }
    });

}

function editarPassword(password,callback){
    var db = mongoConfigs.getDB();
    var estado={};
    db.collection('registo_contas').updateOne({password:password_user}, {$set: {password:password}}, function (err, result) {
             estado.sucesso=true;
             estado.mensagem=("Password editada com sucesso: " +nome_user);
            console.log("Password editada com sucesso: " +nome_user);
            callback(err,result,estado);
    });


}
function editarFoto(foto,callback){
    var db = mongoConfigs.getDB();
    db.collection("registo_contas").find({ _id: id_user}, { $exists: true }).toArray(function    (err, doc) //find if a value exists
    {
        var estado={};
        if (doc && doc.length) //if it does
        {
            callback(err,doc,estado);
        }
        else // if it does not
        {
            db.collection('registo_contas').updateOne({nome:nome_user}, {$set: {foto:caminho_editar}}, function (err, result) {
                estado.sucesso=true;
                estado.mensagem=("Foto editada com sucesso: " +nome_user);
                console.log("Foto editada com sucesso: " +nome_user);
                callback(err,result,estado);
            });


        }
    });
}
module.exports = {
    editarNome,
    editarPassword,
    editarFoto

};
