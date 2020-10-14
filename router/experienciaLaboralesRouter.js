const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getExperienciaLaboralByCedula, createExperienciaLaboral, updateExperienciaLaboral, deleteExperienciaLaboral } = require('../controller/experienciaLaboralController');

const router = new Router();

// obtener
router.get('/:cedula', getExperienciaLaboralByCedula);


// crear
router.post('/:cedula', [
    check('fechaInicio', 'La fecha inicio es obligarotio').not().isEmpty(),
    check('empresa', 'La empresa es obligatorio').not().isEmpty(),
    check('cargo', 'El cargo es obligatorio').not().isEmpty(),
    check('responsabilidad', 'la responsabilidad es obligatorio').notEmpty(),
    check('area', 'El area es obligatorio').notEmpty(),
    validarCampos
], createExperienciaLaboral);

// actualizar
router.put('/:id', [
    check('fechaInicio', 'La fecha inicio es obligarotio').not().isEmpty(),
    check('empresa', 'La empresa es obligatorio').not().isEmpty(),
    check('cargo', 'El cargo es obligatorio').not().isEmpty(),
    check('responsabilidad', 'la responsabilidad es obligatorio').notEmpty(),
    check('area', 'El area es obligatorio').notEmpty(),
    validarCampos
], updateExperienciaLaboral);

// eliminar
router.delete('/:id', deleteExperienciaLaboral);

module.exports = router;