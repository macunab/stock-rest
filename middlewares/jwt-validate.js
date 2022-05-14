const jwt = require('jsonwebtoken');
const { request } = require('express');

const validateJWT = ( req = request , res, next ) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'header token is required'
        });
    }
    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.uid = uid;
        req.name = name;
    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token'
        });
    }
    next();
}

module.exports = {
    validateJWT
}

