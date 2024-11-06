const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) =>{
    console.log(req.body)
    try {
        const dados = await TicketModel.create({
            idTicket: req.body[0].objectId
        });
        console.log(dados);

        fetch(`https://api.hubapi.com/crm/v3/objects/tickets/${req.body[0].objectID}`,{
            method:'PUT',
            headers:{
                'Content-Type':application/json
            },
            body:JSON.stringfy({
                "properties": {
			        "eta": "2024-11-30",
                })
        })
            .then(respnse=> response.json())
            .then(data=> console.log(data))
            .catch(error => console.log(error))
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
