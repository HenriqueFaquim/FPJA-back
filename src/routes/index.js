var express = require('express');
const ConnectToDB = require('../middlewares/ConnectToDB');
var router = express.Router();

/* GET home page. */
router.get('/', ConnectToDB, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
