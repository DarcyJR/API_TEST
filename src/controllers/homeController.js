const HomeModel = require('../models/HomeModels');
exports.homeGet = async (req, res) => {
    
    const home = await HomeModel.find();
    res.send(home);
}
