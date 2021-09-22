const express = require('express');
const router = express.Router();

//Pagina principal, en este caso es una peticion GET que devuelve un mensaje al conectarse
router.get('/', (req, res) => {
    res.send('Me funciona la Api de Monguito, no lo puedo creer');
});

module.exports = router;