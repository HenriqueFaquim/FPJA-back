const mongoose = require('mongoose');

const saldSchema = new mongoose.Schema(
    {
        data:{
            type: String,
            required: false
        },
        saldo :{
            type: Number,
            required: true
        },
    },
    {
        //timestamp faz com que o mongoose crie a data de criação e data de atualização automaticamente
        timestamps:true,
    }
);

const Saldo = mongoose.model('Saldo', saldSchema);
module.exports = Saldo;