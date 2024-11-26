const { ClienteModel, ProprietarioModel } = require('../models/ProprietarioModels');

exports.getCliente = async (req, res) => {
    res.render('cliente/cliente')
}

exports.postCliente = async (req, res) => {
    try {
        const cliente = new ClienteModel(req.body);
        await cliente.save();
        //res.status(201).json(cliente);
        res.redirect('/cliente/cliente');
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.getProprietario = async (req, res) => {
    res.render('cliente/proprietario')
}

exports.postProprietario = async (req, res) => {
    try {
        const proprietario = new ProprietarioModel(req.body);
        await proprietario.save();
        //res.status(201).json(proprietario);
        res.redirect('/cliente/proprietario');
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}