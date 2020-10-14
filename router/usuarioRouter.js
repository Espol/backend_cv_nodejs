/*
    Ruta: /cv/usuario
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, createUsuario, deleteUsuario, getUsuarioByCedula } = require('../controller/usuario');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// rutas
/*
    obtener los usuario
*/
router.get('/', getUsuarios);

/*
    crear un usuario
*/
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('cedula', 'La cedula es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio y tener el formato de correo').isEmail(),
    validarCampos
], createUsuario);

/*
    Borrar Usuario
*/
router.delete('/', [
    check('cedula', 'La cedula es obligatorio').not().isEmpty(),
    validarCampos,
], deleteUsuario);

/*
    Buscar un usuario con la cedula
*/
router.get('/:cedula', getUsuarioByCedula);


module.exports = router;