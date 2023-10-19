var express = require('express');
const AuthUser = require('../middlewares/AuthUser');
const ConnectToDB = require('../middlewares/ConnectToDB');
const Cont = require('../models/contrib');
const handleError = require('../functions/handleError');
const Saldo = require('../models/saldo');
var router = express.Router();

router.post('/', AuthUser, ConnectToDB, async function(req, res) {
  try {
    let {valor, saldo} = req.body;
    const usuarioCriador = req.userJwt.id;
    const att = await (await Saldo.create({saldo}))
    const resBD = await (await Cont.create({valor , usuarioCriador})).populate('usuarioCriador')


    res.status(200).json({
        status: "Okay",
        statusMessage: "A contribuição foi registrada com sucesso.",
        menssage: resBD,
        saldo: att,
      })

  } catch (error) {
    return handleError(res,error);
  }
});

router.get('/', AuthUser, ConnectToDB, async function(req,res){
    try {
        const att = await Saldo.find();
        const resBD = await Cont.find().populate('usuarioCriador');

        res.status(200).json({
            status: "Okay",
            statusMessage: "Seguem as listas de contribuições.",
            menssage: resBD,
            saldo: att,
          })

    } catch (error) {
        return handleError(res,error);
    }
})

module.exports = router;
