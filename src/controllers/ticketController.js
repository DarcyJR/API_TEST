const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) => {
    console.log(req.body);
    try {
        const dados = await TicketModel.create({
            idTicket: req.body[0].objectId
        });
        console.log(dados);

        fetch(`https://api.hubapi.com/crm/v3/objects/tickets/${req.body[0].objectId}`, {  // Verifique se 'objectId' está correto
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Coloque 'application/json' entre aspas
            },
            body: JSON.stringify({  // Use 'JSON.stringify' em vez de 'JSON.stringfy'
                "properties": {
                    "eta": "2024-12-25"
                }
            })
        })
            .then(response => response.json())  // Corrija 'respnse' para 'response'
            .then(data => console.log(data))
            .catch(error => console.log(error));

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
