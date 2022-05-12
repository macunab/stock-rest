const express = require('express');
const cors = require('cors');
const { append } = require('express/lib/response');

require('dotenv').config();

const app = express();

app.use( cors() );

app.use( express.json() );

app.listen( 4000, () => {
    console.log(`Se ha iniciado el servidor`);
})