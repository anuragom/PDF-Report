const jwt = require('jsonwebtoken');
const jwtkey = require('../config/config');
let payload;

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    jwt.verify(jwtkey.OMAuthKey, (err, decode) => {
        if (err) {
            res.send(err);
        }
        else {
            payload = decode;
        }
    })



    // if (!payload) {
    //     return res.status(401).send('Unauthorized request')
    // }


    // req.userId = payload.subject
    next();
}


