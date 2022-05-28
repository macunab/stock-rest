const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateJWT = require('../helpers/jwt');

// login with token generation
const userLogin = async ( req, res = response ) => {
    const { email, password } = req.body;
    try {
        const dbUser = await User.findOne({ email }).populate('office');
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
        if(!dbUser.isActive) {
            return res.status(400).json({
                ok: false,
                msg: 'the account is disabled'
            });
        }

        const token = await generateJWT( dbUser.id, dbUser.name, dbUser.permissionLevel, dbUser.office );
        res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            permissions: dbUser.permissionLevel,
            office: dbUser.office,
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

    const { uid, name, permissions, office } = req;
    const token = await generateJWT(uid, name, permissions, office);
    res.status(200).json({
        ok: true,
        uid: uid,
        name: name,
        permissions: permissions,
        office: office,
        token
    });
}


module.exports = {
    userLogin,
    renewToken
}