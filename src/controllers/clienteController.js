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
        res.status(400).json({ error: error.message });
    }
}

exports.getProprietario = async (req, res) => {
    //get do ticket
    const getUserProprietario = await fetch(`https://api.hubapi.com/settings/v3/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.YOUR_TOKEN}`
        },
    });

    if (!getUserProprietario.ok) {
        console.log("Erro")
    } else {
        const data = await getUserProprietario.json();
        const dataUser = data.results
        res.render('cliente/proprietario', { data: dataUser });
    }
}

//Salva um unico proprietario
exports.postProprietario = async (req, res) => {
    try {
        const proprietario = new ProprietarioModel(req.body);
        await proprietario.save();
        //res.status(201).json(proprietario);
        res.redirect('/cliente/proprietario');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Salvar todos os proprietarios que são trazidos pela API
exports.postProprietarioUser = async (req, res) => {
    try {
        const { proprietarioUser } = (req.body);
        if (!proprietarioUser || !Array.isArray(proprietarioUser)) {
            return res.status(400).json({ error: "Formato invalido ou dados ausentes" });
        }

        const formateData = proprietarioUser.map(user => ({
            idhub: user.id,
            proprietario: user.nome
        }));

        const result = await ProprietarioModel.insertMany(formateData, { ordered: false });

        //res.status(201).json({ message: "Dados inseridos com sucesso", result })
        res.redirect('/cliente/proprietario');
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Alguns dados já existem no banco", details: error.keyValue });
        }
        res.status(500).json({ error: "Erro ao processar dados", details: error.message });
    }
}