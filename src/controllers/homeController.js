const HomeModel = require('../models/HomeModels');
exports.homeGet = async (req, res) => {
    try {
        const home = await HomeModel.find();
        //res.send(home);
        res.render('home', {items: home});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao buscar dados.' });
    }
}
