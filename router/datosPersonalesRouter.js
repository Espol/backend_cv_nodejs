/*
    Ruta: /cv/datosPersonales
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getDatosPersonalesByCedula, createDatosPersonales, updateDatosPersonales } = require('../controller/datosPersonalesController')
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.get('/:cedula', getDatosPersonalesByCedula);

router.post('/:cedula', [
    check('edad', 'El campo edad es obligatorio').not().isEmpty(),
    check('direccion', 'El campo direccion es obligatorio').not().isEmpty(),
    check('telefono', 'El campo telefono es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'El campo fechaNacimiento es obligatorio').not().isEmpty(),
    check('lugarNacimiento', 'El campo lugarNacimiento es obligatorio').not().isEmpty(),
    validarCampos,
], createDatosPersonales);

router.put('/:id', [
    check('edad', 'El campo edad es obligatorio').not().isEmpty(),
    check('direccion', 'El campo direccion es obligatorio').not().isEmpty(),
    check('telefono', 'El campo telefono es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'El campo fechaNacimiento es obligatorio').not().isEmpty(),
    check('lugarNacimiento', 'El campo lugarNacimiento es obligatorio').not().isEmpty(),
    validarCampos,
], updateDatosPersonales);


module.exports = router;