const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const IdiomaModel = new Schema({
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    lectura: {
        type: String,
        required: true
    },
    escrito: {
        type: String,
        required: true
    },
    conversacion: {
        type: String,
        required: true
    }

});

IdiomaModel.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Idioma', IdiomaModel);