/*const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: String,
    descricao: String
});

const HomeModel = mongoose.model('home', HomeSchema);

module.exports = HomeModel;*/

//teste
const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    idTicket: Int
})

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;
