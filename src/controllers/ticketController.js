const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) =>{
    try {
        const dados = await TicketModel.create({
            idTicket: req.body.objectId
        });
        console.log(dados);
        res.send(dados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
