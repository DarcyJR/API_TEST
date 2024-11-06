const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    idTicket: Number
})

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;
