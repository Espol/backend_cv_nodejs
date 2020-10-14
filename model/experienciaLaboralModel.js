const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const ExperienciaLaboralSchema = new Schema({

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaFin: {
        type: String,
        default: ''
    },
    actualmente: {
        type: Boolean,
        default: true
    },
    empresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    responsabilidad: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    clientes: {
        type: String,
        default: ''
    }
});

ExperienciaLaboralSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('ExperienciaLaboral', ExperienciaLaboralSchema);