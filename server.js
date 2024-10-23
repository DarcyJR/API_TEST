require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');


/*const mongoose = require('mongoose');*/

/*mongoose.connect(process.env.CONNECTMONGO || process.env.CONNECT_MONGO)
    .then(() => {
        console.log('Base conectada');
        app.emit('conectado');
    })
    .catch((e) => {
        console.error(e);
    });*/

app.use(express.json());//Analisar o body como json
app.use(express.urlencoded({ extends: true }));

app.use(routes);

app.listen(3000, () => {
        console.log('Servidor iniciado');
        console.log('http://localhost:3000');
})

/*app.on('conectado', () => {
    app.listen(3000, () => {
        console.log('Servidor iniciado');
        console.log('http://localhost:3000');
    })
})*/
