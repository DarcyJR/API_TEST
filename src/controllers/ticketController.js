const TicketModel = require('../models/TicketModels');

exports.homeWebHook = async (req, res) =>{
    
    console.log(req.body);
    res.status(200).send(res.body);
    
    await TicketModel.create({
        idTicket: req.body.objectId
    })
    .then((dados) =>{
        console.log(dados);
        res.send(dados);
    }).catch((error)=>{
        console.log(error);
        res.send(error)
    })
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
