var mongoConfigs = require('./mongoConfigs');

function inserirRegisto(nome,password,foto,callback){
    var db = mongoConfigs.getDB();
    db.collection("registo_contas").find({ nome:nome}, { $exists: true }).toArray(function(err, doc) //find if a value exists
    {
        var estado={};
        if (doc && doc.length) //if it does
        {
            estado.sucesso=false;
            estado.mensagem="Já existe uma conta com o seguinte nome: "+ nome;
            console.log(doc,"Já existe uma conta com o seguinte nome: "+ nome);
            callback(err,doc,estado);

        }
        else // if it does not
        {
            estado.sucesso=true;
            estado.mensagem="Conta Criada com Sucesso, Bem vindo: " + nome;
            console.log("Conta Criada com Sucesso, Bem vindo: " + nome);
            db.collection('registo_contas').insertOne({nome:nome, password:password, foto:foto,ativo:1}, function (err, result) {
                callback(err,result,estado);
            });
            db.collection('registo_contas').updateOne({nome:nome}, {$set: {foto:caminho}});

        }
    });

}


module.exports = {
    inserirRegisto,
};
