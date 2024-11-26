require('dotenv').config();
const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) => {
    console.log(`Cabecalho do POST ${req.body}`);
    try {
        const newDate = "";
        const existingTicket = await TicketModel.findOne({
            idTicket: req.body[0].objectId
        })

        if (existingTicket) {
            console.log('Ticket já existe');
            return res.status(400).send('Ticket já existe');
        }

        const dados = await TicketModel.create({
            idTicket: req.body[0].objectId
        });
        console.log(dados);

        //get do ticket
        const getResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/${req.body[0].objectId}?properties=tipo_solicitacao_tecnologia_br`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.YOUR_TOKEN}`
            },
        });

        if (!getResponse.ok) {
            console.log("Erro")
        } else {
            const data = await getResponse.json();
            const getSolicitacao = data.results.properties.tipo_solicitacao_tecnologia_br
            const getCreateDate = data.results.properties.createdate;
            if (getSolicitacao) {
                switch (getSolicitacao) {
                    case "Customização e Melhoria":
                        break;
                    case "Correção de Funcionalidade":
                        break;
                    case "Replicação de regras, relatórios e importadores	":
                        break;
                    case "Suporte, Orientação ao usuário":
                        break;
                    default:
                        break;
                }
            }
        }
        //edicao do ticket
        /*const response = await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/${req.body[0].objectId}`, {
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
        })*/

        const data = await response.json();
        console.log(`PATCH no Hub ${data}`);

        res.status(200).send('Dados atualizados com sucesso');

    } catch (error) {
        console.error(`Erro no banco ou na edicao da data ${error}`);
        res.status(500).send(error);
    }
};

exports.tickets = async (req, res) => {
    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/?properties=tipo_solicitacao_tecnologia_br,subject&limit=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.YOUR_TOKEN}`
        },
    })

    if (!response.ok) {//false
        res.render('error');
    } else {
        const data = await response.json();
        //res.send(data.results[0].properties.subject)
        res.render('tickets', { data: data.results });
    }
}

