require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path')

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTMONGO || process.env.CONNECT_MONGO)
    .then(() => {
        console.log('Servidor conectado com banco de dados');
        app.emit('conectado');
    })
    .catch((e) => {
        console.error(e);
    });

app.use(express.json());//Analisar o body como json
app.use(express.urlencoded({ extends: true }));
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('conectado', () => {
    app.listen(3000, () => {
        console.log('Servidor iniciado');
        console.log('http://localhost:3000');
    })
})
