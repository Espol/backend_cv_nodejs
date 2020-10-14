const UsuarioModel = require('../model/usuarioModel');
const IdiomaModel = require('../model/idiomaModel');

const { responseStatus400, responseStatus500 } = require('../Util/util');

const getIdiomaByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            responseStatus400(res, `No existe usuario con cedula ${ cedula }`);
        }
        const idiomas = await IdiomaModel.find({ usuario: usuario._id });
        res.status(200).json({
            ok: true,
            idiomas
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor comunicar con administración');
    }
};

const createIdiomaByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            responseStatus400(res, `No existe usuario con cedula ${ cedula }`);
        }
        const idioma = new IdiomaModel({
            usuario: usuario._id,
            ...req.body
        });
        const nuevo = await idioma.save();
        res.status(200).json({
            ok: true,
            idioma: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor comunicar con administración');
    }
};

const updateIdiomaById = async(req, res) => {
    try {
        const { id } = req.params;
        const find = await IdiomaModel.findById({ _id: id });
        if (!find) {
            responseStatus400(res, `No existe registro con id ${ id }`);
        }
        const idioma = {
            usuario: find.usuario._id,
            ...req.body
        };
        const update = await IdiomaModel.findByIdAndUpdate(id, idioma, { new: true })
        res.status(200).json({
            ok: true,
            idioma: update
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor comunicar con administración');
    }
};

module.exports = {
    getIdiomaByCedula,
    createIdiomaByCedula,
    updateIdiomaById
}