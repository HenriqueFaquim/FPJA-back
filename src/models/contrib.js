const mongoose = require('mongoose');

const contSchema = new mongoose.Schema(
    {
        valor :{
            type: Number,
            required: true
        },
        usuarioCriador:{
            // esse type junto com o Ref referencia as tasks para cada usuario
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        //timestamp faz com que o mongoose crie a data de criação e data de atualização automaticamente
        timestamps:true,
    }
);

const Cont = mongoose.model('Contibuicao', contSchema);
module.exports = Cont;