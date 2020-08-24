const express = require('express');

const Pdfreport = require('../routes/pdfreport');
module.exports = function(app) {
    app.use(express.json());


    app.use('/api/pdfreport', Pdfreport);

}