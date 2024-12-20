const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    cliente:{
        type:String,
        required:true,
        unique:true
    },
    proprietario:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'proprietario'
        }
    ]

})

const ProprietarioSchema = new mongoose.Schema({
    idhub:{
        type:String,
        required:true,
        unique:true
    },
    proprietario: {
        type:String,
    }
});

const ProprietarioModel = mongoose.model('proprietario', ProprietarioSchema);
const ClienteModel = mongoose.model('cliente', ClienteSchema);

module.exports = {ProprietarioModel, ClienteModel};