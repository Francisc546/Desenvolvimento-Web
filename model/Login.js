var mongoConfigs = require('./mongoConfigs');

function confirmarLogin(nome,password,callback){
    var db = mongoConfigs.getDB();
    db.collection("registo_contas").find({ nome:nome,password:password}, { $exists: true }).toArray(function    (err, doc) //find if a value exists
    {
        var estado={};
        if (doc && doc.length) //if it does
        {
            estado.sucesso=true;
            estado.mensagem="Login efetuado com sucesso, Bem vindo "+ nome;
            console.log(doc,"Login efetuado com sucesso, Bem vindo "+ nome);
            callback(err, doc,estado);
        }
        else // if it does not
        {
            estado.sucesso=false;
            estado.mensagem="Dados errados, já tem conta?, Pode ter introduzido os dados errados, tente novamente! ";
            callback(err,doc,estado);

        }
    });

}

module.exports = {
    confirmarLogin,
};
