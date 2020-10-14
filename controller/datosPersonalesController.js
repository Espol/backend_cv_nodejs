const { response } = require('express');
const { responseStatus400, responseStatus500 } = require('../Util/util');


const DatosPersonalesModel = require('../model/datosPersonalesModel');
const UsuarioModel = require('../model/usuarioModel');

/*
    Obtener los datos personales a partir de la cedula del usuario
*/
const getDatosPersonalesByCedula = async(req, res) => {

    try {
        const { cedula } = req.params;

        const usuarioModel = await UsuarioModel.findOne({ cedula });

        if (!usuarioModel) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const dp = await DatosPersonalesModel.findOne({ usuario: usuarioModel._id })
        if (!dp) {
            return responseStatus400(res, `No existe datos personales para la cedula ${ cedula }`);
        }

        res.json({
            ok: true,
            datosPersonales: dp
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

/*
    Crear los datos personales
*/
const createDatosPersonales = async(req, res) => {

    const { cedula } = req.params;

    try {
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const datosPersonales = new DatosPersonalesModel({ usuario: usuario._id, ...req.body });

        const dpNew = await datosPersonales.save();

        res.json({
            ok: true,
            datosPersonales: dpNew
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
}

const updateDatosPersonales = async(req, res) => {
    const { id } = req.params;

    try {
        const dp = await DatosPersonalesModel.findById({ _id: id });
        if (!dp) {
            return responseStatus400(res, `No se encuentra datos personales con id ${ id }`);
        }

        const datosPersonalesUpdate = {
            usuario: dp.usuario._id,
            ...req.body,
        }

        const dpActualizado = await DatosPersonalesModel.findByIdAndUpdate(id, datosPersonalesUpdate, { new: true });

        res.json({
            ok: true,
            datosPersonales: dpActualizado
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
}


module.exports = {
    getDatosPersonalesByCedula,
    createDatosPersonales,
    updateDatosPersonales
}