const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateJWT = require('../helpers/jwt');
const { JsonWebTokenError } = require('jsonwebtoken');

// login with token generation
const userLogin = async ( req, res = response ) => {
    const { email, password } = req.body;
    try {
        const dbUser = await User.findOne({ email });
        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'wrong email or password'
            });
        }
        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if(!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: 'wrong email or password'
            });
        }
        const token = await generateJWT( dbUser.id, dbUser.name, dbUser.permissionLevel );
        res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            permissions: dbUser.permissionLevel,
            token
        });

    } catch(err) {
        res.status(401).json({
            ok: false,
            msg: 'server error in login'
        });
    }
}

const renewToken = async (req, res) => {

    const { uid, name, permissions } = req;
    console.log({permissions});
    const token = await generateJWT(uid, name, permissions);
    res.status(200).json({
        ok: true,
        uid: uid,
        name: name,
        permissions: permissions,
        token
    });
}


module.exports = {
    userLogin,
    renewToken
}