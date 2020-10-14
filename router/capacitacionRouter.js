const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const {
    getCapacitacionByCedula,
    createCapacitacionByCedula,
    updateCapaticacionById
} = require('../controller/capacitacionController');

//obtener informacion por filtro de la cedula
router.get('/:cedula', getCapacitacionByCedula);

router.post('/:cedula', [
    check(['nombre', 'emitido', 'descripcion', 'participacion', 'lugar', 'fecha'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], createCapacitacionByCedula);

router.put('/:id', [
    check(['nombre', 'emitido', 'descripcion', 'participacion', 'lugar', 'fecha'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], updateCapaticacionById);

module.exports = router;