const { responseStatus500, responseStatus400 } = require('../Util/util');
const UsuarioModel = require('../model/usuarioModel');
const ReferenciaModal = require('../model/referenciaModel');

const getReferenciaByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `No existe Usuario con cedula ${ cedula }`);
        }
        const referencias = await ReferenciaModal.find({ usuario: usuario._id });
        res.status(200).json({
            ok: true,
            referencias
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor contactar con administración');
    }
};

const createReferenciaByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `No existe Usuario con cedula ${ cedula }`);
        }
        const referencia = new ReferenciaModal({
            usuario: usuario._id,
            ...req.body
        });
        const nuevo = await referencia.save();
        res.status(200).json({
            ok: true,
            referencia: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor contactar con administración');
    }
};

const updateReferenciaById = async(req, res) => {
    try {
        const { id } = req.params;
        const find = await ReferenciaModal.findById({ _id: id });
        if (!find) {
            return responseStatus400(res, `No existe registro con id ${ id }`);
        }
        const referencia = {
            usuario: usuario._id,
            ...req.body
        };
        const nuevo = await ReferenciaModal.findByIdAndUpdate(id, referencia, { new: true });
        res.status(200).json({
            ok: true,
            referencia: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor contactar con administración');
    }
};

const deleteReferenciaById = async(req, res) => {
    try {
        const { id } = req.params;
        const find = await ReferenciaModal.findById({ _id: id });
        if (!find) {
            return responseStatus400(res, `No existe registro con id ${ id }`);
        }
        await ReferenciaModal.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: 'Eliminado Correctamente'
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error inesperado, por favor contactar con administración');
    }
};



module.exports = {
    getReferenciaByCedula,
    createReferenciaByCedula,
    updateReferenciaById,
    deleteReferenciaById
}