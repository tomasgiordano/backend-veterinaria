const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db');

//Nos conectamos a la base de datos de MongoDB
db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('MongoDB Conectado');
})

//Configuracion de cors
const corsOptions = {
    origin: "*"
};

//Iniciamos express
const app = express();

//Middleware para solicitudes registradas en la consola
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//Rutas - Se puede crear cualquier cantidad, en este ejemplo esta el index y perrito
app.use('/', require('./routes/index')); //Ruta principal, solo tiene un mensaje
app.use('/perrito', require('./routes/perrito')); //Ruta sobre la cual se haran las consultas

//Puerto que se abrira y estara ocupado por la app
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App activa en el puerto ${port}`));