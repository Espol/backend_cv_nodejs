const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const ReferenciaModel = new Schema({
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    Telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }

});

ReferenciaModel.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Referencia', ReferenciaModel);