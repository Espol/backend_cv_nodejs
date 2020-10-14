/*
    Ruta: /cv/educacion
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getEducacionByCedula, createEducacionByCedula, updateEducacionById } = require('../controller/educacionController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// obtener
router.get('/:cedula', getEducacionByCedula);

// crear
router.post('/:cedula', [
    check(['nombre', 'nivel', 'titulo', 'origen'], 'Campos obligatorio').not().isEmpty(),
    validarCampos
], createEducacionByCedula);

// Actualizar
router.put('/:id', [
    check(['nombre', 'nivel', 'titulo', 'origen'], 'Campos obligatorio').not().isEmpty(),
    validarCampos
], updateEducacionById);


module.exports = router;