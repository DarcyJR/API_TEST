const { ClienteModel, ProprietarioModel } = require('../models/ProprietarioModels');

exports.getCliente = async (req, res) => {
    //retorno por api
    const clientes = await fetch(`https://api.hubapi.com/properties/v2/tickets/properties`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.YOUR_TOKEN}`
        },
    })

    if (!clientes.ok) {
        console.log("Erro")
    } else {
        const dataClientes = await clientes.json();
        const dataClient = dataClientes[0];
        //res.send(dataClient.options);
        res.render('cliente/cliente', { data: dataClient.options })
    }
}

/*exports.postCliente = async (req, res) => {
    try {
        const cliente = new ClienteModel(req.body);
        await cliente.save();
        //res.status(201).json(cliente);
        res.redirect('/cliente/cliente');

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}*/

exports.postCliente = async (req, res) => {
    try {
        const { clienteCadastro } = req.body;

        if (!clienteCadastro || !Array.isArray(clienteCadastro)) {
            return res.status(400).json({ error: "Formato invalido ou dados ausentes" });
        }

        const formateData = clienteCadastro.map(user => ({
            cliente: user.nome
        }));

        //obtem os nomes já existentes no banco
        const existingClients = await ClienteModel.find(
            { cliente: { $in: formateData.map(data => data.cliente) } },
            { cliente: 1 }//retorna apenas o campo cliente
        );

        //Filtra os dados para incluir apenas os que ainda não existem
        const existingClientNames = existingClients.map(client => client.cliente);
        const dataToInsert = formateData.filter(data => !existingClientNames.includes(data.cliente));

        //insere apenas os dados novos
        if (dataToInsert.length > 0) {
            await ClienteModel.insertMany(dataToInsert, { ordered: false });
        }

        //const result = await ClienteModel.insertMany(formateData, { ordered: false });

        res.redirect('/cliente/cliente');
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Alguns dados já existem no banco", details: error.keyValue });
        }
        res.status(500).json({ error: "Erro ao processar dados", details: error.message });
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
/*exports.postProprietario = async (req, res) => {
    try {
        const proprietario = new ProprietarioModel(req.body);
        await proprietario.save();
        //res.status(201).json(proprietario);
        res.redirect('/cliente/proprietario');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}*/

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

        const existingRecords = await ProprietarioModel.find(
            { idhub: { $in: formateData.map(data => data.idhub) } },
            { idhub: 1 }
        )
        
        const existingIds = existingRecords.map(record => record.idhub);
        const dataToInsert = formateData.filter(data => !existingIds.includes(data.idhub))
        
        if (dataToInsert.length > 0) {
            await ProprietarioModel.insertMany(dataToInsert, { ordered: false });
        }

        //const result = await ProprietarioModel.insertMany(formateData, { ordered: false });

        res.redirect('/cliente/proprietario');

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Alguns dados já existem no banco", details: error.keyValue });
        }
        res.status(500).json({ error: "Erro ao processar dados", details: error.message });
    }
}