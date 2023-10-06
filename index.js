const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');  //importar o cors
const routes = require('./src/routes');
const app = express();
require('dotenv').config();


const indexRouter = require('./src/routes/index');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rota para a pagina inicial index.html
app.use('/', indexRouter);

//rotas da api
routes(app);

// porta para os testes em localhost
app.listen(3000, ()=>{
    console.log('Node is running on port 3000')})

module.exports = app;