const { responseStatus500, responseStatus400 } = require('../Util/util');


const ConocimientoModel = require('../model/conocimientoModel');
const UsuarioModel = require('../model/usuarioModel');
const { find } = require('../model/conocimientoModel');

// obtener
const getConocimientoByCedula = async(req, res) => {
    try {

        const { cedula } = req.params;

        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }
        const conocimientos = await ConocimientoModel.find({ usuario: usuario._id });

        res.status(200).json({
            ok: true,
            conocimientos
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

// crear
const createConocimientoByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;

        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `Usuario con cedula ${ cedula } no existe`);
        }

        const conocimiento = new ConocimientoModel({
            usuario: usuario._id,
            ...req.body
        })

        const nuevo = await conocimiento.save();
        res.status(200).json({
            ok: true,
            conocimiento: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

// actualizar
const updateConocimientoById = async(req, res) => {
    try {
        const { id } = req.params;
        const find = await ConocimientoModel.findById({ _id: id });
        if (!find) {
            return responseStatus400(res, `No se encuentra conocimiento con id ${ id } `);
        }

        const conocimiento = {
            usuario: find.usuario._id,
            ...req.body
        }
        const nuevo = await ConocimientoModel.findByIdAndUpdate(id, conocimiento, { new: true });
        res.status(200).json({
            ok: true,
            conocimiento: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

const deleteConocimientoById = async(req, res) => {
    try {

        const { id } = req.params;

        const find = await ConocimientoModel.findById({ _id: id });
        if (!find) {
            return responseStatus400(res, `No se encuentra conocimiento con id ${ id } `);
        }
        await ConocimientoModel.findByIdAndDelete({ _id: id });
        res.status(200).json({
            ok: true,
            mesg: `Registro con id ${ id } fue eliminado existosamente.`
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, "Error inesperado, consulte a la administración");
    }
};

module.exports = {
    getConocimientoByCedula,
    createConocimientoByCedula,
    updateConocimientoById,
    deleteConocimientoById
};