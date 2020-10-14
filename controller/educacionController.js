const { responseStatus400, responseStatus500 } = require('../Util/util');
const EducacionModel = require('../model/educacionModel');
const UsuarioModel = require('../model/usuarioModel');

const getEducacionByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;

        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const educaciones = await EducacionModel.find({ usuario: usuario._id });
        if (!educaciones) {
            return responseStatus400(res, `El usuario con cedula ${ cedula } no tiene registrado educación`);
        }

        res.json({
            ok: true,
            educaciones
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

const createEducacionByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;

        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const nuevo = new EducacionModel({ usuario: usuario._id, ...req.body });

        const educacion = await nuevo.save();

        res.status(200).json({
            ok: true,
            educacion: educacion
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

const updateEducacionById = async(req, res) => {
    try {
        const { id } = req.params;

        const educacion = await EducacionModel.findById({ _id: id });
        if (!educacion) {
            return responseStatus400(res, `No existe un registro con id ${ id }`);
        }

        const update = {
            usuario: educacion.usuario._id,
            ...req.body
        };

        const actualizado = await EducacionModel.findByIdAndUpdate(id, update, { new: true });

        res.status(200).json({
            ok: true,
            educacion: actualizado
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

module.exports = {
    getEducacionByCedula,
    createEducacionByCedula,
    updateEducacionById
}