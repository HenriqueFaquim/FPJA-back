const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ConnectToDB = require('../middlewares/ConnectToDB');
const handleError = require('../functions/handleError');
const User = require('../models/user');
const AuthUser = require('../middlewares/AuthUser');
const router = express.Router();

router.post('/create', ConnectToDB, async function(req, res) {
  try {
    let {nome, email, senha} = req.body;
    const criptHash = 11;
    const criptPass = await bcrypt.hash(senha, criptHash);
    const resBD = await User.create({nome, email, senha: criptPass})

    res.status(200).json({
      status: "Okay",
      statusMessage: "O usuário foi criado com sucesso.",
      menssage: resBD,
    })

  } catch (error) {
    if(String(error).includes("email_1 dup key")){
      return handleError(res, "Error: já existe um usuário com este e-mail")
    }
    return handleError(res,error);
  }
});

router.post('/login', ConnectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Usuário"]
    let { email, senha} = req.body;

    let resBD = await User.findOne({email}).select('+senha')
    if(resBD) {

      let Pass = await bcrypt.compare(senha, resBD.senha);
      if(Pass){
        let token = jwt.sign({id: resBD._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.header('x-auth-token', token);

        res.status(200).json({
          status: "Okay",
          statusMessage: "O usuário foi autenticado com sucesso.",
          menssage: {'x-auth-token': token},
        });

      }else{
        throw new Error("Email ou Senha Inválidos");
      }
    }else{
      throw new Error("Email ou Senha Inválidos");
    }

  } catch (error) {
    return handleError(res,error);
  }
});

router.put('/update', ConnectToDB, AuthUser, async function(req, res){
try {
  const usuarioLogado = req.userJwt.id;
  const {senha} = req.body;
  const user = await User.findOne({_id: usuarioLogado});
    if(!user){
      throw new Error("Usuario não encontrado!");
    }

  const respDB = await User.updateOne({_id: usuarioLogado},{senha})

  if(respDB?.modifiedCount>0){
    const newUser = await User.findOne({_id: usuarioLogado});

    res.status(200).json({
      status: "Okay",
      statusMessage: "A tarefa foi atualizada com sucesso.",
      menssage: newUser,
      senha: senha,
    })}

} catch (error) {
  return handleError(res,error);
}
});

router.get('/user', ConnectToDB, AuthUser, async function(req, res){
  try {
    const usuarioLogado = req.userJwt.id;
    const respDB = await User.findOne({_id: usuarioLogado});
      if(!respDB){
        throw new Error("Usuario não encontrado!");
      }

      res.status(200).json({
        status: "Okay",
        statusMessage: "A tarefa foi atualizada com sucesso.",
        menssage: respDB,
      })

  } catch (error) {
    return handleError(res,error);
  }
  });


module.exports = router;