const mongoose = require('mongoose');
const validator = require('validator'); //validador irá facilitar a conferencia do email

const userSchema = new mongoose.Schema(
    {
        nome :{
            type: String,
            required: [true, 'Please enter de product name!']
        },
        email:{
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => {return validator.isEmail(valorDigitado)},
                message: 'The email entered is invalid!'
            }
        },
        senha:{
            type: String,
            required: true,
            //select faz com que a informação apareça no retorno da requisição, como a senha deve ficar oculta deixar em False
            select: false,
        },
    },
    {
        //timestamp faz com que o mongoose crie a data de criação e data de atualização automaticamente
        timestamps:true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;