const { response } = require('express');

const { responseStatus400, responseStatus500 } = require('../Util/util');
const UsuarioModel = require('../model/usuarioModel');
const ExperienciaLaboralModel = require('../model/experienciaLaboralModel');
const router = require('../router/experienciaLaboralesRouter');
const experienciaLaboralModel = require('../model/experienciaLaboralModel');

const getExperienciaLaboralByCedula = async(req, res) => {

    try {
        const { cedula } = req.params;

        const usuarioModel = await UsuarioModel.findOne({ cedula });

        if (!usuarioModel) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const experiencias = await ExperienciaLaboralModel.findOne({ usuario: usuarioModel._id });
        if (!experiencias) {
            return responseStatus400(res, `El usuario con cedula ${ cedula } no tiene registrado las experiencias laborales`);
        }

        res.json({
            ok: true,
            experiencias
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

const createExperienciaLaboral = async(req, res) => {

    try {
        const { cedula } = req.params;

        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const experiencaNuevo = new ExperienciaLaboralModel({ usuario: usuario._id, ...req.body });

        const experiencia = await experiencaNuevo.save();

        res.status(200).json({
            ok: true,
            experienciaLaboral: experiencia
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }

};

const updateExperienciaLaboral = async(req, res) => {

    try {

        const { id } = req.params;

        const experienciaFind = await ExperienciaLaboralModel.findById({ _id: id });
        if (!experienciaFind) {
            return responseStatus400(res, `No existe un registro con id ${ id }`);
        }

        const experienciaUpdate = {
            usuario: experienciaFind.usuario._id,
            ...req.body
        };

        const update = await ExperienciaLaboralModel.findByIdAndUpdate(id, experienciaUpdate, { new: true });

        res.status(200).json({
            ok: true,
            experienciaLaboral: update
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }

};
const deleteExperienciaLaboral = async(req, res) => {

    try {
        const { id } = req.params;

        const experienciaFind = await ExperienciaLaboralModel.findById({ _id: id });
        if (!experienciaFind) {
            return responseStatus400(res, `No existe un registro con id ${ id }`);
        }

        await ExperienciaLaboralModel.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: 'Experiencia eliminada'
        });


    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
}

module.exports = {
    getExperienciaLaboralByCedula,
    createExperienciaLaboral,
    updateExperienciaLaboral,
    deleteExperienciaLaboral
}