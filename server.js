const express = require('express');
const app = express();
const winston = require('winston');
const cors = require("cors");
var path = require("path");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const xss = require('xss-clean');

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fastcsv = require("fast-csv");
const fs = require("fs");
//const ws = fs.createWriteStream("../../../mnt/oracle/mis/cronmail.csv");
const nodemailer = require('nodemailer');
var cron = require('node-cron');




app.use(xss());

app.use(helmet());

app.use('/public',express.static(path.join(__dirname,'views')));
app.use( express.static( "public" ) );
//Cross Platform Allow
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());

// //Angular Project
// app.use(express.static(path.join(__dirname, 'public')));
//Routes
require('./startups/routes')(app);


const port = process.env.PORT || 8082;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;