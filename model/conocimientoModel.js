const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const ConocimientoModel = new Schema({
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    porcentaje: {
        type: Number,
        required: true
    },

});

ConocimientoModel.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Conocimiento', ConocimientoModel);