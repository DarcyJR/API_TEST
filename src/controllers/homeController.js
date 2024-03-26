const HomeModel = require('../models/HomeModels');

exports.homeGet = async (req, res) => {
    const home = await HomeModel.find();
    /*const api = home.map(obj => obj.titulo);
    console.log(api)
    res.send(api);*/
    res.send(home)
}

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
}

exports.homePut = async (req, res) => {
    const home = await HomeModel.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo,
        descricao: req.body.descricao
    })
    res.send(home);
}

exports.homeDelete = async (req, res) => {
    const home = await HomeModel.findByIdAndDelete(req.params.id);
    res.send(home);
}
