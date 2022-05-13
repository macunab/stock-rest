const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/dbConfig');

// load env variables
require('dotenv').config();

const app = express();
dbConnection();

// Cors
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/products', require('./routes/product.route'));
app.use('/api/offices', require('./routes/offices.route'));

app.listen( 4000, () => {
    console.log(`Se ha iniciado el servidor`);
})