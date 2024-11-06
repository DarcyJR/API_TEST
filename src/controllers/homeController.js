exports.homeGet = async (req, res) => {
    res.send('Bem vindo');
    const home = await HomeModel.find();
}
