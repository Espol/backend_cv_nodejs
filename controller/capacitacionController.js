const { responseStatus500, responseStatus400 } = require('../Util/util');
const CapacitacionModel = require('../model/capacitacionModel');
const UsuarioModel = require('../model/usuarioModel');

const getCapacitacionByCedula = async(req, res) => {

    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `No existe usuario con cedula ${ cedula }`);
        }
        const capacitaciones = await CapacitacionModel.find({ usuario: usuario._id });

        res.status(200).json({
            ok: true,
            capacitaciones
        });

    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error insperado, por favor comunicarse con adminstración');
    }
};

const createCapacitacionByCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        const usuario = await UsuarioModel.findOne({ cedula });
        if (!usuario) {
            return responseStatus400(res, `No existe usuario con cedula ${ cedula }`);
        }
        const capacitacion = new CapacitacionModel({
            usuario: usuario._id,
            ...req.body
        });
        const nuevo = await capacitacion.save();
        res.status(200).json({
            ok: true,
            capacitacion: nuevo
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error insperado, por favor comunicarse con adminstración');
    }
};

const updateCapaticacionById = async(req, res) => {
    try {
        const { id } = req.params;
        const find = await CapacitacionModel.findById({ _id: id });
        if (!find) {
            return responseStatus400(res, `No existe Registro con id ${ id }`);
        }
        console.log(find);
        const capacitacion = {
            usuario: find.usuario._id,
            ...req.body
        }
        const update = await CapacitacionModel.findByIdAndUpdate(id, capacitacion, { new: true });
        res.status(200).json({
            ok: true,
            capacitacion: update
        });
    } catch (error) {
        console.log(error);
        responseStatus500(res, 'Error insperado, por favor comunicarse con adminstración');
    }
};


module.exports = {
    getCapacitacionByCedula,
    createCapacitacionByCedula,
    updateCapaticacionById
}