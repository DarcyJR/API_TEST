const mongoose = require('mongoose');
const ProprietarioSchema = new mongoose.Schema({
    proprietario: {
        type:String,
        required:true,
        unique:true
    }
});

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

const ProprietarioModel = mongoose.model('proprietario', ProprietarioSchema);
const ClienteModel = mongoose.model('cliente', ClienteSchema);

module.exports = {ProprietarioModel, ClienteModel};