const Login = require('../model/Login');

function confirmarLogin(req,callback){
    Login.confirmarLogin(req.body.nome,req.body.password,callback);
}

module.exports = {
    confirmarLogin,
};
