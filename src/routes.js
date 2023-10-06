function routes(app) {
    app.use('/users', require('./routes/users.js'));
    app.use('/cont', require('./routes/cont.js'));
    return;
}

module.exports = routes;