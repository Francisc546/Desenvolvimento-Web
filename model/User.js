const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
/*const fetch = require('node-fetch');*/


var ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
{
    
    nome: String,
    password: String,
    
    convite: {
        type: ObjectId,
        ref: 'Convite'
    },
    
    date: {
        type: Date,
        default: Date.now
    }
    
}); 
    



const User = mongoose.model('Users', userSchema);

