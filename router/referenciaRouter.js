const { Router } = require('express');
const { check } = require('express-validator');

const {
    getReferenciaByCedula,
    createReferenciaByCedula,
    updateReferenciaById,
    deleteReferenciaById
} = require('../controller/referenciaController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:cedula', getReferenciaByCedula);

router.post('/:cedula', [
    check(['nombre', 'Telefono', 'correo', 'tipo'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], createReferenciaByCedula);

router.put('/:id', [
    check(['nombre', 'Telefono', 'correo', 'tipo'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], updateReferenciaById);

router.delete('/:id', deleteReferenciaById);


module.exports = router;