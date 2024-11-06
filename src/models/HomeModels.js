const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: String,
    descricao: String
});

const HomeModel = mongoose.model('home', HomeSchema);

module.exports = HomeModel;
