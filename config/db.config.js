//config.js
const dotenv = require('dotenv').config();

/**
 * MONGO_URL: Aca va el string de conexion que proporciona Cluster para una app
 * Reemplazar "<username>", "<password>" y "myFirstDatabase" por el nombre de usuario, contraseña y nombre de la base de datos
 * MONGO_DB_NAME: Reemplazar "myFirstDatabase" por el nombre de la base de datos
*/
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.3ffam.mongodb.net/veterinaria?retryWrites=true&w=majority',
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'veterinaria'
};