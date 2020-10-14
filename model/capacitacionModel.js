const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const CapacitacionModel = new Schema({
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    emitido: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    participacion: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        default: '0'
    }

});

CapacitacionModel.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Capacitacion', CapacitacionModel);