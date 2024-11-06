const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    idTicket: {
        type:Number,
        required:true,
        unique:true
    }
})

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;
