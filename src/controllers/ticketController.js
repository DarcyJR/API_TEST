const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) =>{
    console.log(req.body)
    try {
        const dados = await TicketModel.create({
            idTicket: req.body[0].objectId
        });
        console.log(dados);
        res.send(dados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
