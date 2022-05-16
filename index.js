const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/dbConfig');
const helmet = require('helmet');

// load env variables
require('dotenv').config();

const app = express();
app.use(helmet());
dbConnection();

// Cors
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/offices', require('./routes/offices.route'));
app.use('/api/movements', require('./routes/movement.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('*', (req, res) => {
    res.status(404).json({
        ok: false,
        msg: 'Ohh you are lost, read the API documentation to find your way back home'
    });
});

app.listen( 4000, () => {
    console.log(`Se ha iniciado el servidor`);
})