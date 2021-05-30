var mongoConfigs = require('./mongoConfigs');

function confirmarLogin(nome,password,callback){
    var db = mongoConfigs.getDB();
            db.collection("registo_contas").find({nome: nome, password:password}, {$exists: true}).toArray(function (err, doc) //find if a value exists
            {
                global.id_user = "vazio";
                var estado = {};
                if (doc && doc.length) //if it does
                {
                    var aux = doc.map(({foto}) => foto);
                    var pic = aux.toString();
                    var aux2 = doc.map(({_id}) => _id);
                    var id = aux2.toString();
                    var aux3 = doc.map(({password}) => password);
                    var pass = aux3.toString();
                    var aux4 = doc.map(({nome}) => nome);
                    var user = aux4.toString();
                    global.id_user = id;
                    global.nome_user = user;
                    global.password_user = pass;
                    global.foto_user = pic;
                    estado.imagem = pic;
                    estado.sucesso = true;
                    estado.mensagem = nome;
                    console.log(doc, nome);
                    callback(err, doc, estado);
                } else {
                    estado.sucesso = false;
                    estado.mensagem = ("Dados incorretos!");
                    callback(err, doc, estado);
                }
            });
}

module.exports = {
    confirmarLogin,
};
