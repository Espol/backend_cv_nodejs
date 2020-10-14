require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/configDB');


const app = express();

app.use(cors());

// Lectura y Parceo del body
app.use(express.json());


dbConnection();


// Rutas


app.use('/cv/usuario', require('./router/usuarioRouter'));
app.use('/cv/datospersonales', require('./router/datosPersonalesRouter'));
app.use('/cv/experiencialaboral', require('./router/experienciaLaboralesRouter'));
app.use('/cv/conocimiento', require('./router/conocimientoRouter'));
app.use('/cv/capacitacion', require('./router/capacitacionRouter'));
app.use('/cv/educacion', require('./router/educacionRouter'));
app.use('/cv/idioma', require('./router/idiomaRouter'));
app.use('/cv/referencia', require('./router/referenciaRouter'));
app.use('/', require('./router/testRouter'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});