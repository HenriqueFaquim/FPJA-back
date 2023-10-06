var express = require('express');
const AuthUser = require('../middlewares/AuthUser');
const ConnectToDB = require('../middlewares/ConnectToDB');
const Cont = require('../models/contrib');
const handleError = require('../functions/handleError');
var router = express.Router();

router.post('/', AuthUser, ConnectToDB, async function(req, res) {
  try {
    let {valor} = req.body;
    const usuarioCriador = req.userJwt.id;
    const resBD = await (await Cont.create({valor , usuarioCriador})).populate('usuarioCriador')

    res.status(200).json({
        status: "Okay",
        statusMessage: "A contribuição foi registrada com sucesso.",
        menssage: resBD,
      })

  } catch (error) {
    return handleError(res,error);
  }
});

router.get('/', AuthUser, ConnectToDB, async function(req,res){
    try {
        const resBD = await Cont.find();

        res.status(200).json({
            status: "Okay",
            statusMessage: "Seguem as listas de contribuições.",
            menssage: resBD,
          })

    } catch (error) {
        return handleError(res,error);
    }
})

router.get('/user', AuthUser, ConnectToDB, async function(req,res){
    try {
        const usuarioLogado = req.userJwt.id;
        const resBD = await Cont.find({usuarioCriador: usuarioLogado});

        res.status(200).json({
            status: "Okay",
            statusMessage: "Seguem as listas de contribuições deste usuario.",
            menssage: resBD,
          })

    } catch (error) {
        return handleError(res,error);
    }
})

module.exports = router;
