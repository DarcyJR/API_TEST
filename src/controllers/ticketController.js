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
/*

exports.homePost = async (req, res) => {
    await HomeModel.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    })
        .then((dados) => {
            console.log(dados);
            res.send(dados);
        })
        .catch((e) => {
            console.log(e);
            res.send(e);
        })
}*/
