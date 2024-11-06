const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    idTicket: Int
})

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;
