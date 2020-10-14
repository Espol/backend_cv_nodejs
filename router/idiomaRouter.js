const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
    getIdiomaByCedula,
    createIdiomaByCedula,
    updateIdiomaById
} = require('../controller/idiomaController');


const router = Router();


router.get('/:cedula', getIdiomaByCedula);


router.post('/:cedula', [
    check(['nombre', 'lectura', 'escrito', 'conversacion'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], createIdiomaByCedula);

router.put('/:id', [
    check(['nombre', 'lectura', 'escrito', 'conversacion'], 'Campo obligatorio').not().isEmpty(),
    validarCampos
], updateIdiomaById);



module.exports = router;