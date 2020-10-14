const { Router } = require('express');
const { getTest } = require('../controller/test');

const router = Router();

// rutas
router.get('/', getTest);

module.exports = router;