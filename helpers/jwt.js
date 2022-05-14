const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, permissions) => {
    const payload = { uid, name, permissions };

    return new Promise(( resolve, reject ) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, ( err, token )  => {
            if(err) {
                reject(err);
            } else {
                resolve(token)
            }
        });
    });
}

module.exports = generateJWT;