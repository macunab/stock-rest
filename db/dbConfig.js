const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CNN );
        console.log('DB online');
    } catch(err) {
        console.log( err );
        throw new Error('Se ha producido un error al intentar conectarse a la db');
    }
}

module.exports = dbConnection;