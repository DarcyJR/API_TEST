const { ProprietarioModel, ClienteModel } = require('../models/ProprietarioModels');

exports.getProprietario = async (req, res) => {
   try {
      const clientes = await ClienteModel.find().populate('proprietario');
      const proprietarios = await ProprietarioModel.find();
      clientes.forEach((cliente) => {
         /*cliente.proprietario.forEach(prop => {
            console.log(prop._id)
         })*/
        //console.log(cliente.proprietario[0]._id)
      })
      res.render('proprietarios', { clientes, proprietarios });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

exports.postProprietario = async (req, res) => {
   const { clienteId, proprietarioId } = req.body;

   try {
      await ClienteModel.findByIdAndUpdate(clienteId, { proprietario: proprietarioId });
      res.redirect('/proprietarios');
   } catch (error) {
      res.status(500).send(error.message);
   }
}