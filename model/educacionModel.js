const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const EducacionModel = new Schema({
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    nombre: {
        required: true,
        type: String
    },
    nivel: {
        required: true,
        type: String
    },
    titulo: {
        type: String,
        required: true
    },
    origen: {
        type: String,
        required: true
    }
});

EducacionModel.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Educacion', EducacionModel);