const responseStatus500 = (res, mensaje) => {
    return res.status(500).json({
        ok: false,
        msg: mensaje /*"Error inesperado"*/
    });

}

const responseStatus400 = (res, mensaje) => {
    return res.status(400).json({
        ok: false,
        msg: mensaje /*"Error inesperado"*/
    });
}

module.exports = {
    responseStatus500,
    responseStatus400
}