const { response } = require('express');

const UsuarioModel = require('../model/usuarioModel');
const { responseStatus500, responseStatus400 } = require('../Util/util');
/*
 *   Obtiene todos los usuarios
 */
const getUsuarios = async(req, res) => {

    const usuarios = await UsuarioModel.find({}, 'nombre apellido cedula correo');

    res.status(200).json({
        ok: true,
        usuarios: usuarios
    });
};

/**
 * 
 * Crea un nuevo usuario
 */
const createUsuario = async(req, res = response) => {

    const { cedula } = req.body;

    try {

        const exiteCedula = await UsuarioModel.findOne({ cedula });

        if (exiteCedula) {
            return responseStatus400(res, "La cedula ya existe");
        }

        const usuario = new UsuarioModel(req.body);

        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario: usuario,
            msg: "Usuario Creado correctamente"
        });

    } catch (error) {
        responseStatus500(res, "Error inesperado, consulte a la administración")
    }
};

const getUsuarioByCedula = async(req, res = response) => {
    const { cedulas } = req.params;

    try {
        const usuarioFind = await UsuarioModel.findOne({ cedula });
        if (!usuarioFind) {
            return responseStatus400(res, `No Existe usuario con la cedula ${ cedula }`);
        }

        res.json({
            ok: true,
            msg: 'Usuario Encontrado',
            usuario: usuarioFind
        });

    } catch (error) {
        responseStatus500(res, "Error inesperado, consulte a la administración")
    }
}

const deleteUsuario = async(req, res = response) => {

    const { cedula } = req.body;

    try {
        const exiteCedula = await UsuarioModel.findOne({ cedula });
        if (!exiteCedula) {
            return res.status(400).json({
                ok: false,
                msg: "La cedula No existe"
            });
        }
        await UsuarioModel.findOneAndDelete({ cedula });
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        responseStatus500(res, "Error inesperado, consulte a la administración")
    }

}

module.exports = {
    getUsuarios,
    createUsuario,
    getUsuarioByCedula,
    deleteUsuario
};