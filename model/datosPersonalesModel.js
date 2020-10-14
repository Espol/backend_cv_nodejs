const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.set('useFindAndModify', false);

const DatosPersonalesSchema = new Schema({

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    edad: {
        required: true,
        type: Number
    },
    estadoCivil: {
        type: String,
        default: 'Soltero'
    },
    direccion: {
        required: true,
        type: String
    },
    telefono: {
        required: true,
        type: String
    },
    hijos: {
        type: Number,
        default: 0
    },
    fechaNacimiento: {
        required: true,
        type: String
    },
    lugarNacimiento: {
        required: true,
        type: String
    }
});

DatosPersonalesSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('DatosPersonales', DatosPersonalesSchema);