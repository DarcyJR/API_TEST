require('dotenv').config();
const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) => {
    console.log(`Cabecalho do POST ${req.body}`);
    try {

        const existingTicket = await TicketModel.findOne({
            idTicket: req.body[0].objectId
        })

        if(existingTicket){
            console.log('Ticket já existe');
            return res.status(400).send('Ticket já existe');
        }
        
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
        console.log(`PATCH no Hub ${data}`);

        res.status(200).send('Dados atualizados com sucesso');
        
    } catch (error) {
        console.error(`Erro no banco ou na edicao da data ${error}`);
        res.status(500).send(error);
    }
};

exports.tickets = async (req, res)=>{
    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/tickets?limit=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${process.env.YOUR_TOKEN}`
        }
    })

    if(response.ok){
        const data = await response.json();
        //res.send(data.results[0].properties.subject)
        res.render('tickets', {data: data.results});
    }else{
        
    }
}