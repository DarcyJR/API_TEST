require('dotenv').config();
const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) => {
    console.log(req.body);
    try {
        const dados = await TicketModel.create({
            idTicket: req.body[0].objectId
        });
        console.log(dados);

        const response = await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/${req.body[0].objectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${process.env.YOUR_TOKEN}`
            },
            body: JSON.stringify({
                "properties": {
                    "eta": "2024-12-25"
                }
            })
        })

        const data = await response.json();
        console.log(data);

        res.status(200).send('Dados atualizados com sucesso');
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
