const getTest = (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
}

module.exports = {
    getTest
}