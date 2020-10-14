const { Router } = require('express');
const { check } = require('express-validator');

const { getConocimientoByCedula, createConocimientoByCedula, updateConocimientoById, deleteConocimientoById } = require('../controller/conocimientoController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// obtgener
router.get('/:cedula', getConocimientoByCedula);

// crear
router.post('/:cedula', [
    check(['nombre', 'porcentaje'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], createConocimientoByCedula);

// actualizar
router.put('/:id', [
    check(['nombre', 'porcentaje'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], updateConocimientoById);

//delete
router.delete('/:id', deleteConocimientoById);






module.exports = router;